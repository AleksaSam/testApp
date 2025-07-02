import React, { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

interface Book {
    id: string
    volumeInfo: {
        title: string
        authors: string[]
        description?: string
        publishedDate?: string
        averageRating?: number
        imageLinks?: {
            thumbnail?: string
        }
    }
}

export function BookDetailPage() {
    const { id } = useParams()
    const [book, setBook] = useState<Book | null>(null)
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
    return(
        <div className="max-w-4*1 mx-auto p-6">
            <Link to="/" className="text-blue-500 underline mb-4 inline-block">Назад</Link>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-1/3 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                    <img 
                        src={imageLinks?.thumbnail || 'https://placehold.co/128x193?text=No+Image'}
                        alt={title}
                        className="w-full h-auto object-contain"
                    />
                </div>
                <div className="md:w-2/3">
                    <h1 className="text-2*1 font-semibold mb-2">{title}</h1>
                    <p className="text-gray-600 mb-2">
                        Автор(ы): {authors?.join(", ") || "Неизвестно"}
                    </p>
                    <p className="text-gray-600 mb-2">
                    Дата публикации: {publishedDate || '—'}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Рейтинг: {averageRating ? `${averageRating}/5` : 'Нет оценки'}
                    </p>
                    <div className="prose max-w-none">
                        <h2 className="text-lg font-semibold mb-1">Описание:</h2>
                        <p>{description || 'Описание отсутствует.'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}