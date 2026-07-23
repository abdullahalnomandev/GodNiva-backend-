import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RAGService } from './rag.service';
import { getSingleFilePath } from '../../../shared/getFilePath';
import path from 'path';

// Upload and process PDF
const uploadPDF = catchAsync(async (req: Request, res: Response) => {
  const filePath = getSingleFilePath(req.files, 'doc') || '';
  console.log('filePath', filePath);

  const relativePath = path.join('uploads', filePath);
  console.log('relativePath', relativePath);

  const result = await RAGService.processAndSavePDF(relativePath);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'PDF processed and embeddings saved successfully',
    data: result,
  });
});

// Query RAG system
const queryRAG = catchAsync(async (req: Request, res: Response) => {
  const { question } = req.body;
  
  if (!question) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.BAD_REQUEST,
      message: 'Question is required',
      data: null,
    });
    return;
  }

  const result = await RAGService.queryRAG(question);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Query processed successfully',
    data: result,
  });
});

export const RAGController = {
  uploadPDF,
  queryRAG,
};