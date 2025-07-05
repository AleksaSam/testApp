import React from 'react'

type Props = {
    authors?: string[]
    publishedDate?: string
    averageRating?: string
}

export const BookInfo: React.FC<Props> = ({ authors, publishedDate, averageRating }) => (
    <>
        <p className="text-gray-600 mb-2">
            Автор(ы): {authors?.join(", ") || "Неизвестно"}
        </p>
        <p className="text-gray-600 mb-2">
            Дата публикации: {publishedDate || '—'}
        </p>
        <p className="text-gray-600 mb-4">
            Рейтинг: {averageRating ? `${averageRating}/5` : 'Нет оценки'}
        </p>
    </>
)