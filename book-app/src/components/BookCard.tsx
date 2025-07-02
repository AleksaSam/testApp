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
      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full flex flex-col"
    >
      <div className="w-full h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={thumbnail || 'https://placehold.co/128x193?text=No+Image'}
          alt={title}
          className="h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {authors?.join(', ') || 'Unknown Author'}
        </p>
      </div>
    </Link>
  )
}