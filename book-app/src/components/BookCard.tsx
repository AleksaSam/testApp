import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  id: string
  title: string
  authors?: string[]
  thumbnail?: string
}

export const BookCard: React.FC<Props> = ({ id, title, authors, thumbnail }) => {
  return (
    <Link
      to={`/book/${id}`}
      className="flex flex-col h-full bg-white border rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
    >
      <div className="h-60 bg-gray-100 flex items-center justify-center">
        <img
          src={thumbnail || 'https://placehold.co/128x193?text=No+Image'}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="font-semibold text-base mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {authors?.join(', ') || 'Unknown Author'}
        </p>
      </div>
    </Link>
  )
}