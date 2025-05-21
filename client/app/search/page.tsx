'use client'

import { useEffect, useState } from "react"
import { quoteType } from "../page";
import { QuoteCard } from "../components/quoteCard/QuoteCard";
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from "next/navigation";
import { QUOTES_URL } from "../constants";

const appendParams = (text: string, author: string) => {
  const query = new URLSearchParams();
  if (text) query.append('text', text);
  if (author) query.append('author', author);
  return query;
}

export default function SearchPage() {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [quotes, setQuotes] = useState<quoteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authorFromParams = searchParams.get('author') || '';
    const textFromParams = searchParams.get('text') || '';

    if (!authorFromParams && !textFromParams) return;

    setAuthor(authorFromParams);
    setText(textFromParams);

    (async function () {
      try {
        setIsLoading(true);
        const query = appendParams(textFromParams, authorFromParams);
        router.push(`?${query}`);

        const response = await fetch(`${QUOTES_URL}?${query}&limit=12`);

        if (!response.ok) {
          toast.error(`Something went wrong!`);
          return;
        }
        const result = await response.json();

        setQuotes(result);
      } catch {
        toast.error(`Something went wrong!`);
      } finally {
        setIsLoading(false);
      }
    })()

  }, [router, searchParams])

  useEffect(() => {
    if (sessionStorage.getItem('delete')) {
      sessionStorage.removeItem('delete');
      toast.info('Quote was deleted!')
    }
  }, [])

  const handleSearch = () => {
    const query = appendParams(text, author);
    router.push(`?${query}`);
  }

  const handleReset = () => {
    setQuotes([]);
    setText('');
    setAuthor('');
    router.push(`/search`);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="w-12 h-12 border-4 border-white border-b-transparent rounded-full inline-block animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div>
        <input type="text" name="author" placeholder="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
        <input type="text" name="title" placeholder="text" value={text} onChange={(event) => setText(event.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <ul className="flex flex-wrap justify-center gap-10 pb-10 pt-10">
        {!quotes.length && <div>There is no quotes</div>}
        {quotes.map(quote => <QuoteCard key={quote.id} {...quote} />)}
      </ul>
    </div>
  )
}