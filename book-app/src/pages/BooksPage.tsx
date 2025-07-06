import { BookSearch } from '../components/BookSearch'
import { BookCard } from '../components/BookCard'
import type { Book } from '../interfaces/Book'
import { useState, useCallback } from 'react'

export function BooksPage(){

  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)

   const fetchBooks = useCallback(
  async (append: boolean, customQuery: string, index: number) => {
    if (!customQuery) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          customQuery
        )}&startIndex=${index}&maxResults=12`
      )
      if(!res?.ok) {
        throw new Error(`Ошибка HTTP: ${res?.status}`)
      }
      const data = await res.json()

      const fetchedBooks: Book[] = data.items || []

      if (append) {
        setBooks(prev => [
          ...prev,
          ...fetchedBooks.filter(newBook => !prev.some(b => b.id === newBook.id)),
        ])
        setStartIndex(prev => prev + 12)
       } else {
        setBooks(fetchedBooks)
        setStartIndex(12)
      }

      setHasMore(fetchedBooks.length === 12)
    } catch (err) {
      setError("Ошибка загрузки книг. Попробуйте позже.")
    } finally {
      setLoading(false)
    }
  },
  [books]
)

  const handleSearch = (search: string) => {
  setQuery(search)
  setBooks([])
  setStartIndex(12) // <- т.к. мы загружаем первые 12, следующий startIndex = 12
  setHasMore(true)
  setError(null)
  fetchBooks(false, search, 0) // загружаем с нуля
}

  const loadMore = () => {
    fetchBooks(true, query, startIndex)
  }

  return (
    <div className="p-4 max-w-7xl mx-auto w-full">
      <BookSearch onSearch={handleSearch} />

      {error && <div className="text-red-600 mt-4 text-center">{error}</div>}

      {loading && books.length === 0 && (
        <div className="text-center mt-4 text-gray-500">Загрузка...</div>
      )}

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

      {books.length > 0 && hasMore && !loading && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Загрузить ещё
          </button>
        </div>
      )}

      {loading && books.length > 0 && (
        <div className="text-center mt-4 text-gray-500">Загрузка...</div>
      )}
    </div>
  )
}