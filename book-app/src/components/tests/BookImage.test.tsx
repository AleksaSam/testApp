import { render, screen } from '@testing-library/react'
import { BookImage } from '../BookImage'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

describe("BookImage", () => {
    it("renders thumnail", () => {
        render(
            <MemoryRouter>
                <BookImage 
                    src="https://example.com/image.jpg"
                    alt="Book 1"
                />
            </MemoryRouter>
        )
        const img = screen.getByRole("img") as HTMLImageElement
        expect(img).toHaveAttribute("src", "https://example.com/image.jpg")
        expect(img).toHaveAttribute("alt", "Book 1")
    })
})