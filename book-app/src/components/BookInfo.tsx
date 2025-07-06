import React from 'react'

type Props = {
    title: string
    authors?: string[]
    publishedDate?: string
    averageRating?: number
    plainTextDescription?:string
}

export const BookInfo: React.FC<Props> = ({ title, authors, publishedDate, averageRating, plainTextDescription }) => (
    <>
        <h1 className="text-2x1 font-semibold mb-2">{title}</h1>
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
            <p>{plainTextDescription || 'Описание отсутствует.'} </p>
        </div>
    </>
)