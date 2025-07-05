import { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import type { BookDetail } from '../interfaces/Book'
import { BookImage } from '../components/BookImage'
import { BookInfo } from '../components/BookInfo'

export function BookDetailPage() {
    const { id } = useParams()
    const [book, setBook] = useState<BookDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBook = async () => {
            try{
                const res = await fetch(
                    `https://www.googleapis.com/books/v1/volumes/${id}`
                )
                if(!res.ok) {
                    throw new Error(`Ошибка HTTP: ${res.status}`)
                }
                const data = await res.json()
                setBook(data)
            } catch(err) {
                setError("Ошибка загрузки книги. Попробуйте позже.")
                console.error("Ошибка загрузки книги:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchBook()
    }, [id])

    if (loading) return <div className="text-center mt-10">Загрузка...</div>
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>
    if (!book) return <div className="text-center mt-10">Книга не найдена</div>
    const { title, authors, description, publishedDate, averageRating, imageLinks } = book.volumeInfo
    const plainTextDescription = description?.replace(/<[^>]+>/g, '') || 'Описание отсутствует.'
    return(
        <div className="max-w-4*1 mx-auto p-6">
            <Link to="/" className="text-blue-500 underline mb-4 inline-block">Назад</Link>
            <div className="flex flex-col md:flex-row gap-6">
                <BookImage src={ imageLinks?.thumbnail } alt={ title }/>
                <div className="md:w-2/3">
                    <h1 className="text-2*1 font-semibold mb-2">{title}</h1>
                    <BookInfo authors={authors} publishedDate={publishedDate} averageRating={averageRating} />
                    <div className="prose max-w-none">
                        <h2 className="text-lg font-semibold mb-1">Описание:</h2>
                        <p>{plainTextDescription} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}