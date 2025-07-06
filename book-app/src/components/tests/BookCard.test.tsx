import { render, screen } from '@testing-library/react'
import { BookCard } from '../BookCard'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

describe("BookCard", () => {
    it("renders title, authors, thumnail,", () => {
        render(
            <MemoryRouter>
                <BookCard 
                    id="book1"
                    title="Book 1"
                    authors={["Author"]}
                    thumbnail="https://example.com/image.jpg"
                />
            </MemoryRouter>
        )
        expect(screen.getByText("Book 1")).toBeInTheDocument()
        expect(screen.getByText("Author")).toBeInTheDocument()
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://example.com/image.jpg")
    })
})