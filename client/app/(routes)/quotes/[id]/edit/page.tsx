'use client'

import { InputField } from "@/app/components/InputField/InputField";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QUOTES_URL } from "@/app/constants";
import { toast } from "react-toastify";
import { createArrayOFUniqueValues } from "../createArrayOfUniqueValue";
import { fieldValidationErrorType } from "../types";

export default function EditQuote() {
  const [text, setText] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [categories, setCategories] = useState<string>('');

  const router = useRouter();
  const params = useParams();

  const id = params.id;
  const QUOTE_URL = `${QUOTES_URL}/${id}`;

  useEffect(() => {
    (async function () {
      if (id) {
        try {
          const result = await fetch(QUOTE_URL);

          if (!result.ok) {
            toast.error('Something went wrong!');
            return;
          }

          const quote = await result.json();

          setText(quote.text)
          setAuthor(quote.author)
          setCategories(quote.categories.join(' '))

        } catch {
          toast.error('Something went wrong!');
        }
      }
    })()
  }, [QUOTE_URL, id])

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      text,
      author,
      categories: createArrayOFUniqueValues(categories.trim().split(' '))
    }

    try {
      const request = await fetch(QUOTE_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const result = await request.json()

      if (!request.ok && request.status !== 500) {
        result.errors.map((e: fieldValidationErrorType) => toast.error(e.msg))
        return;
      }

      if (!request.ok) {
        throw new Error('Something went wrong!')
      }

      sessionStorage.setItem('edited', 'true');
      router.push(`/quotes/${id}`)

    } catch {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div>
      <h2>Edit</h2>
      <form onSubmit={handleEdit}>
        <InputField value={author} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} placeholder="author" />
        <InputField value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} placeholder="text" />
        <InputField value={categories} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategories(e.target.value)} placeholder="categories" />
        <button>Save quote</button>
      </form>
    </div>
  )
}