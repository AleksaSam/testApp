export interface Book {
    id: string
    volumeInfo: {
        title: string
        authors?: string[]
        imageLinks?: {
        thumbnail?: string
        }
    }
}

export interface BookDetail extends Book {
    volumeInfo: Book["volumeInfo"] & {
        description?: string
        publishedDate?: string
        averageRating?: number
    }
}