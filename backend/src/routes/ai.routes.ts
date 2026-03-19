import { Hono } from 'hono';
import * as leadController from '../controllers/leadController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import catchAsync from '../utils/catchAsync.ts';

const aiRoutes = new Hono();

aiRoutes.use('*', authMiddleware);

aiRoutes.post('/insights', catchAsync(leadController.getAiInsights));
aiRoutes.post('/email', catchAsync(leadController.generateEmail));

export default aiRoutes;
