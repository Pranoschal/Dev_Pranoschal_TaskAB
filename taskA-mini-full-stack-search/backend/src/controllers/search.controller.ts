import { Request, Response } from 'express';
import { searchFAQs } from '../services/search.service';
import { SearchRequest } from '../types';

export const searchController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req.body as SearchRequest;
    console.log(query)
    // Validate query
    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query is required and must be a string' });
      return;
    }

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      res.status(400).json({ error: 'Query cannot be empty' });
      return;
    }

    const result = searchFAQs(trimmedQuery);

    res.json(result);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};