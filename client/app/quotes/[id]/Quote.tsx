'use client'

import { useEffect, useState } from "react"
import { quotesType } from "@/app/random/page";
import { toast } from "react-toastify";

interface IQuoteParams {
  id: string
}

export default function Quote({ id }: IQuoteParams) {
  const [quote, setQuote] = useState<null | quotesType>(null);
  const [isError, setIsError] = useState<boolean>(false)
  const QUOTE_URL = `http://localhost:3000/quotes/${id}`;

  useEffect(() => {
    const created = sessionStorage.getItem('created');

    if (created) {
      toast.info('Quote created!');
      sessionStorage.removeItem('created');
    }
  }, [])

  useEffect(() => {
    (async function () {
      if (id) {
        try {
          const result = await fetch(QUOTE_URL);

          if (!result.ok) {
            setIsError(true)
            toast.error('Something went wrong!');
            return;
          }

          const quote = await result.json();
          setQuote(quote);
        } catch (error) {
          setIsError(true)
          console.log(error)
        }
      }
    })()
  }, [QUOTE_URL, id])

  if (isError) {
    return (
      <p>Something went wrong</p>
    )
  }

  return (
    <div className="flex flex-col p-5 basis-80 bg-gray-100 gap-10 shadow-xs">
      <p className="text-sm self-center">{quote?.text}</p>
      <p className="text-base self-end">{quote?.author}</p>
      <ul className="flex gap-3 flex-wrap justify-center">
        {quote?.categories.map((category) => <div className="p-1 text-xs bg-rose-100 rounded-md" key={category}>{category}</div>)}
      </ul>
    </div>
  )
}