import React from 'react'
import { BookSearch } from '../components/BookSearch'
import { BookCard } from '../components/BookCard'
import { useEffect, useState, useCallback } from 'react'


interface Book {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: {
      thumbnail?: string
    }
  }
}

export function BooksPage(){

  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

    const fetchBooks = useCallback(
    async (append = false) => {
      if (!query) return

      setLoading(true)

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&startIndex=${startIndex}&maxResults=12`
        )
        const data = await res.json()

        const newBooks: Book[] = (data.items || []).filter(
          (newBook: Book) => !books.some(book => book.id === newBook.id)
        )

        if (append) {
          setBooks(prev => [...prev, ...newBooks])
        } else {
          setBooks(newBooks)
        }

        setStartIndex(prev => prev + 12)
        setHasMore(newBooks.length > 0)
      } catch (err) {
        console.error('Ошибка загрузки книг:', err)
      } finally {
        setLoading(false)
      }
    },
    [query, startIndex, books]
  )

  const handleSearch = (search: string) => {
    setQuery(search)
    setStartIndex(0)
    setHasMore(true)
    setBooks([])
  }

  useEffect(() => {
    if (query) fetchBooks(false)
  }, [query])

  return (
    <div className="p-4 max-w-7xl mx-auto w-full">
      <BookSearch onSearch={handleSearch} />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book, index) => {
          const { title, authors, imageLinks } = book.volumeInfo
          return (
            <BookCard
              key={`${book.id}-${index}`}
              id={book.id}
              title={title}
              authors={authors}
              thumbnail={imageLinks?.thumbnail}
            />
          )
        })}
      </div>

      {hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={() => fetchBooks(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Загрузить ещё
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center mt-4 text-gray-500">Загрузка...</div>
      )}
    </div>
  )
}