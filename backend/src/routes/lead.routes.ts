import { Hono } from 'hono';
import * as leadController from '../controllers/leadController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import catchAsync from '../utils/catchAsync.ts';

const leadRoutes = new Hono();

leadRoutes.use('*', authMiddleware);

leadRoutes.get('/', catchAsync(leadController.getSavedLeads));
leadRoutes.post('/', catchAsync(leadController.saveLead));
leadRoutes.post('/find', catchAsync(leadController.findLeads));
leadRoutes.patch('/:id', catchAsync(leadController.updateLead));
leadRoutes.delete('/:id', catchAsync(leadController.deleteLead));

export default leadRoutes;