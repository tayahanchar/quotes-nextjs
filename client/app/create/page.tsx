'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from 'react-toastify';
import { InputField } from "../components/InputField/InputField";

type fieldValidationErrorType = {
  type: string,
  value: string,
  msg: string,
  path: string,
  location: string
}

const createArrayOFUniqueValues = (array: string[]) => {
  const valuesSet = new Set(array);
  return Array.from(valuesSet);
}

export default function CreateQuote() {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [categories, setCategories] = useState<string>('');

  const router = useRouter();

  const handleQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      text,
      author,
      categories: createArrayOFUniqueValues(categories.trim().split(' '))
    }

    try {
      const request = await fetch('http://localhost:3000/quotes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const result = await request.json()

      if (!request.ok && request.status !== 500) {
        result.errors.map((e: fieldValidationErrorType) => toast.error(e.msg))
        return;
      }

      if (!request.ok) {
        throw new Error('Something went wrong!')
      }

      sessionStorage.setItem('created', 'true');
      router.push(`/quotes/${result.id}`)

    } catch {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div>
      <h2>Create new quote</h2>
      <form onSubmit={handleQuote}>
        <InputField value={author} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} placeholder="author" />
        <InputField value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="text" />
        <InputField value={categories} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategories(e.target.value)} placeholder="categories" />
        <button>Create quote</button>
      </form>
    </div>
  )
}