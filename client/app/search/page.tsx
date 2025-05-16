'use client'

import { useState } from "react"
import { quoteType } from "../page";
import { QuoteCard } from "../components/quoteCard/QuoteCard";
import { toast } from 'react-toastify';

export default function SearchPage() {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [quotes, setQuotes] = useState<quoteType[]>([])

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();

      if (title) query.append('text', title);
      if (author) query.append('author', author);

      const response = await fetch(`http://localhost:3000/quotes?${query}&limit=12`);
      const result = await response.json();
      setQuotes(result)

    } catch (e) {
      console.log(e)
      toast.error('Something went wrong!');
    }
  }

  const handleReset = () => {
    setQuotes([]);
    setTitle('');
    setAuthor('');
  }

  return (
    <div>
      <div>
        <input type="text" name="author" placeholder="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
        <input type="text" name="title" placeholder="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <ul className="flex flex-wrap justify-center gap-10 pb-10 pt-10">
        {quotes.map(quote => <QuoteCard key={quote.id} {...quote} />)}
      </ul>
    </div>
  )
}