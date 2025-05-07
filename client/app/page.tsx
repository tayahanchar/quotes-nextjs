"use client";

import { useEffect, useState } from "react";
import { QuoteCard } from "./components/quoteCard/QuoteCard";

type quotesType = {
  id: number,
  text: string,
  author: string,
  categories: string[]
}

export default function Home() {
  const [quotes, setQuotes] = useState<quotesType[]>([])

  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:3000/quotes/random?limit=12');
      const result = await response.json();
      setQuotes(result)
    })()
  }, [])

  return (
    <div className="pr-20 pl-20 flex flex-col gap-20 pt-10">
      <h1 className="flex justify-center text-4xl font-bold">Quotes App</h1>
      <ul className="flex flex-wrap justify-center gap-10 pb-20">
        {quotes.map(quote => <QuoteCard key={quote.id} {...quote} />)}
      </ul>
    </div>
  );
}
