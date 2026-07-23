import { readFile } from 'fs/promises';
import { PDFParse } from 'pdf-parse';
import OpenAI from 'openai';
import config from '../../../config';


export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: config.openai.api_key as string,
});

// Extract text from PDF file
export const extractTextFromPDF = async (filePath: string) => {
  const buffer = await readFile(filePath);
  const parser = new PDFParse({
    data: new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength),
  });
  const result = await parser.getText();
  await parser.destroy();
  return result.text;
};

// Create embedding for a single text string
// Returns a Promise that resolves to the embedding array
export const createEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
  // example embedding like: [0.1, 0.2, 0.3, ...]
};


// Helper function to split text into chunks
export const chunkText = (text: string, chunkSize = 1000, overlap = 200) => {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize - overlap;
  }
  return chunks;
};
