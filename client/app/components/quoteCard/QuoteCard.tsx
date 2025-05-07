import { FC } from "react"

interface IQuoteCardProps {
  id: number,
  text: string,
  author: string,
  categories: string[]
}

export const QuoteCard: FC<IQuoteCardProps> = ({ text, author, categories }) => {
  return (
    <div className="flex flex-col p-5 basis-80 bg-gray-100 gap-10 shadow-xs">
      <p className="text-sm self-center">{text}</p>
      <p className="text-base self-end">{author}</p>
      <ul className="flex gap-3 flex-wrap justify-center">
        {categories.map((category) => <div className="p-1 text-xs bg-rose-100 rounded-md" key={category}>{category}</div>)}
      </ul>
    </div>
  )
}