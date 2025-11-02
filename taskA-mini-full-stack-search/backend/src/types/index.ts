export interface FAQ {
  id: string;
  title: string;
  body: string;
}

export interface SearchResult {
  results: FAQ[];
  summary: string;
  sources: string[];
}

export interface SearchRequest {
  query: string;
}

export interface ErrorResponse {
  error: string;
}