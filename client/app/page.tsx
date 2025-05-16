"use client";

import { useEffect, useState } from "react";
import { RANDOM_QUOTE_URL } from "./constants";

export type quoteType = {
  id: number,
  text: string,
  author: string,
  categories: string[]
}

export default function Home() {
  const [quote, setQuote] = useState<quoteType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(RANDOM_QUOTE_URL);
        const result = await response.json();
        setQuote(result[0]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-10 pt-30">
      {quote &&
        <>
          <p className="text-4xl">{quote.text}</p>
          <p className="text-base self-end">{quote.author}</p>
        </>
      }
    </div>
  );
}
