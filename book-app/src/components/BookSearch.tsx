import React, { useState } from 'react'

type Props = {
  onSearch: (query: string) => void
  initialQuery?: string
}

export const BookSearch: React.FC<Props> = ({ onSearch, initialQuery = ''}) => {
    const [query, setQuery] = useState(initialQuery)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
        }
    }
    return (
        <form onSubmit={handleSubmit} className="sticky top-0 z-20 bg-white px-4 py-3 shadow-md flex items-center gap-2">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Найти по названию или автору..."
                className="border border-gray-300px px-4 py-2 rounded w-full"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Найти
            </button>
        </form>
    )
}