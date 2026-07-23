import OpenAI from 'openai';
import { QdrantClient } from '@qdrant/js-client-rest';
import config from '../../../config';
import fs from 'fs';
import path from 'path';
const { PDFParse } = require('pdf-parse');

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.openai.api_key as string,
});

const qdrant = new QdrantClient({
  url: config.qdrant.url,
  apiKey: config.qdrant.api_key,
});

// Helper function to split text into chunks
const chunkText = (text: string, chunkSize = 1000, overlap = 200) => {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
};

// Extract text from PDF
const extractTextFromPDF = async (filePath: string) => {
  const absolutePath = path.join(process.cwd(), 'uploads', filePath);
  const dataBuffer = fs.readFileSync(absolutePath);
  const parser = new PDFParse({ data: dataBuffer });

  const result = await parser.getText();
  console.log(result.text);
  return result.text;
};

// Create embedding for a single text string
const createEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
  // example embedding like: [0.1, 0.2, 0.3, ...]
};

// Process and save PDF document
const processAndSavePDF = async (filePath: string) => {
  // 1. Extract text from PDF
  const text = await extractTextFromPDF(filePath);

  // 2. Split text into chunks
  const chunks = chunkText(text);

  // 3. Create embeddings for each chunk
  const points = [];
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await createEmbedding(chunks[i]);
    points.push({
      id: `${Date.now()}-${i}`,
      vector: embedding,
      payload: {
        filePath,
        text: chunks[i],
        chunkIndex: i,
      },
    });
  }

  // 4. Ensure collection exists in Qdrant
  try {
    await qdrant.getCollection('docs');
  } catch (error) {
    // If collection doesn't exist, create it
    await qdrant.createCollection('docs', {
      vectors: {
        size: 1536, // text-embedding-3-small outputs 1536-dimensional vectors
        distance: 'Cosine',
      },
    });
  }

  // 5. Upsert points to Qdrant
  await qdrant.upsert('docs', {
    wait: true,
    points,
  });

  return {
    success: true,
    chunksProcessed: chunks.length,
    filePath,
  };
};

// Query the vector database and get answer
const queryRAG = async (question: string) => {
  // 1. Create embedding for question
  const questionEmbedding = await createEmbedding(question);
  const collections = await qdrant.getCollections();
  console.log(collections);

  // 2. Search Qdrant for similar chunks
  const searchResult = await qdrant.search('docs', {
    vector: questionEmbedding,
    limit: 3, // Get top 3 relevant chunks
  });
  console.log(questionEmbedding);

  // 3. Combine retrieved chunks as context
  const context = searchResult
    .map((result: any) => result.payload.text)
    .join('\n'); // example context like: 'Chunk 1:\nChunk 2:\nChunk 3:'

  // 4. Ask LLM using the context
  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'system',
        content: `Answer the question only based on the following context. If you don't know the answer, just say you don't know. Don't try to make up an answer.
        
Context:
${context}`,
      },
      { role: 'user', content: question },
    ],
    temperature: 0,
    max_tokens: 1000,
  });

  return {
    answer: completion.choices[0].message.content,
    sources: searchResult.map((result: any) => ({
      text: result.payload.text,
      score: result.score,
    })),
  };
};

export const RAGService = {
  processAndSavePDF,
  queryRAG,
};

// import OpenAI from 'openai';
// import config from '../../../config';

// const knowledge = [
//   'BiyerThikana is a Bangladeshi matrimonial platform.',
//   'Users can create biodata and search for partners.',
//   'Premium package costs 999 BDT.',
// ];

// const openai = new OpenAI({
//   baseURL: 'https://openrouter.ai/api/v1',
//   apiKey: config.openai.api_key as string,
// });

// const context = knowledge.join('\n');

// const embeddings = async (text: string) => {
//   const completion = await openai.chat.completions.create({
//     model: 'openai/gpt-4o',
//     messages: [
//       { role: 'system', content: `Answer the question only based on the following context: ${context}` },
//       { role: 'user', content: text },
//     ],
//     temperature: 0.5, /// Controls the randomness of the output. Higher values mean more random output, while values closer to 0 mean more focused output.
//     max_tokens: 500,
//   });

//   console.log(completion.choices[0].message);
//   return completion.choices[0].message.content;
// };

// export const RAGService = {
//   embeddings,
// };
