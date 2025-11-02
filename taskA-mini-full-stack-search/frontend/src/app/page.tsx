"use client"

import { useState } from "react"
import { SearchInput } from "@/components/search/search-input"
import { SearchResults } from "@/components/search/search-results"
import type { SearchResult } from "@/lib/search"

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false)
  const [data, setData] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setHasSearched(false)
      setData(null)
      setError(null)
      return
    }

    setHasSearched(true)
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || "Search failed")
      }

      const result = await res.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">FAQ Search</h1>
            <p className="text-sm text-muted-foreground">Find answers to common questions instantly</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Search Section */}
          <div>
            <SearchInput onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <SearchResults
            results={data?.results || []}
            summary={data?.summary || ""}
            sources={data?.sources || []}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />

          {/* Error State */}
          {error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}