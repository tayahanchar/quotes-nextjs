'use client'

import { QuoteCard } from "@/app/components/quoteCard/QuoteCard"
import { RANDOM_QUOTES_URL } from "@/app/constants"
import { fetchQuotes } from "@/app/helpers/fetchQuotes"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export type quotesType = {
  id: number,
  text: string,
  author: string,
  categories: string[]
}

export default function RandomPage() {
  const [quotes, setQuotes] = useState<quotesType[]>([])
  const [error, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sessionStorage.getItem('delete')) {
      sessionStorage.removeItem('delete');
      toast.info('Quote was deleted!')
    }
  }, [])

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      await fetchQuotes(RANDOM_QUOTES_URL, setQuotes, setIsError);
      setIsLoading(false);
    })()
  }, [])

  const getMoreQuotes = () => {
    (async function () {
      setIsLoading(true);
      await fetchQuotes(RANDOM_QUOTES_URL, setQuotes, setIsError);
      setIsLoading(false);
    })()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="w-12 h-12 border-4 border-white border-b-transparent rounded-full inline-block animate-spin" />
      </div>
    )
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