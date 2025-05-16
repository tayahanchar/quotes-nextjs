'use client'

import { useEffect, useState } from "react"
import { fetchQuotes } from "../helpers/fetchQuotes"
import { RANDOM_QUOTES_URL } from "../constants"
import { QuoteCard } from "../components/quoteCard/QuoteCard"

export type quotesType = {
  id: number,
  text: string,
  author: string,
  categories: string[]
}

export default function RandomPage() {
  const [quotes, setQuotes] = useState<quotesType[]>([])
  const [error, setIsError] = useState<boolean>(false)

  useEffect(() => {
    fetchQuotes(RANDOM_QUOTES_URL, setQuotes, setIsError)
  }, [])

  const getMoreQuotes = () => {
    fetchQuotes(RANDOM_QUOTES_URL, setQuotes, setIsError)
  }

  return (
    <div className="flex flex-col gap-20 pt-10">
      {!error && <button className="bg-gray-300 self-center pt-2 pb-2 pl-10 pr-10 rounded-lg cursor-pointer" onClick={getMoreQuotes}>Get random quotes</button>}
      {error && <p className="self-center">Something went wrong</p>}
      <ul className="flex flex-wrap justify-center gap-10 pb-10">
        {quotes.map(quote => <QuoteCard key={quote.id} {...quote} />)}
      </ul>
    </div>
  );
}