import express from 'express';
import { RAGController } from './rag.controller';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

// Upload and process PDFs
router
  .route('/upload')
  .post(
    fileUploadHandler(),
    RAGController.uploadPDF
  );

// Query RAG system
router
  .route('/query')
  .post(
    RAGController.queryRAG
  );

export const RAGRoutes = router;
