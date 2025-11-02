export interface FAQ {
  id: string
  title: string
  body: string
}

export interface SearchResult {
  results: FAQ[]
  summary: string
  sources: string[]
}

/**
 * Calculate relevance score based on keyword matching
 * Uses term frequency and exact phrase matching
 */
function calculateScore(query: string, title: string, body: string): number {
  const lowerQuery = query.toLowerCase()
  const lowerTitle = title.toLowerCase()
  const lowerBody = body.toLowerCase()

  let score = 0

  // Exact phrase match in title (highest priority)
  if (lowerTitle.includes(lowerQuery)) {
    score += 100
  }

  // Word-by-word matching in title
  const queryWords = lowerQuery.split(/\s+/)
  const titleWords = lowerTitle.split(/\s+/)
  const bodyWords = lowerBody.split(/\s+/)

  queryWords.forEach((word) => {
    if (titleWords.some((tw) => tw.includes(word))) {
      score += 50
    }
    if (bodyWords.some((bw) => bw.includes(word))) {
      score += 10
    }
  })

  return score
}

/**
 * Generate a summary from multiple FAQ results
 */
function generateSummary(results: FAQ[]): string {
  if (results.length === 0) return ""

  const snippets = results
    .slice(0, 3)
    .map((r) => r.body.substring(0, 60) + "...")
    .join(" ")

  return `Found ${results.length} result${results.length !== 1 ? "s" : ""} related to your search. ${snippets}`
}

/**
 * Search FAQs with keyword scoring
 */
export function searchFAQs(query: string, faqs: FAQ[]): SearchResult {
  if (!query.trim()) {
    return {
      results: [],
      summary: "",
      sources: [],
    }
  }

  const scored = faqs
    .map((faq) => ({
      faq,
      score: calculateScore(query, faq.title, faq.body),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.faq)

  return {
    results: scored,
    summary: generateSummary(scored),
    sources: scored.map((r) => r.id),
  }
}
