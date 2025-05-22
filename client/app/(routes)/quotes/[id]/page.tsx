// import Quote from "./Quote"

// export default function QuotePage({ params }: { params: { id: string } }) {
//   return <Quote id={params.id} />
// }

import Quote from "./Quote"

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <Quote id={id} />
}
