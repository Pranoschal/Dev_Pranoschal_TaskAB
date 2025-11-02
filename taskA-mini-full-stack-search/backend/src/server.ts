import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import searchRoutes from './routes/search.routes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', searchRoutes);

app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Client URL: ${config.clientUrl}`);
});

export default app;