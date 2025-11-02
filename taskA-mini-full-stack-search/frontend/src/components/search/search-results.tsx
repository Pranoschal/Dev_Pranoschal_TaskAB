"use client"

import type { FAQ } from "@/lib/search"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchResultsProps {
  results: FAQ[]
  summary: string
  sources: string[]
  isLoading: boolean
  hasSearched: boolean
}

export function SearchResults({ results, summary, sources, isLoading, hasSearched }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!hasSearched) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-sm text-muted-foreground">Enter a search query to get started</p>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
        <p className="text-sm font-medium text-foreground">No results found</p>
        <p className="mt-1 text-sm text-muted-foreground">Try different keywords or check your spelling</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {summary && (
        <div className="rounded-lg bg-primary/5 p-4 border border-primary/10">
          <p className="text-sm text-foreground">{summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Sources:</span>
            {sources.map((id) => (
              <Badge key={id} variant="secondary" className="text-xs">
                #{id}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {results.map((result, index) => (
          <Card key={result.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-balance">{result.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{result.body}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      ID: {result.id}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
