import { render, screen, waitFor } from '@testing-library/react'
import { BookDetailPage } from '../BookDetailPage'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'

const createMockBook = () => ({
  id: "1",
  volumeInfo: {
    title: "Test Book",
    authors: ["Test Author"],
    description: "Test description",
    publishedDate: "2025-01-01",
    averageRating: 4,
    imageLinks: { thumbnail: "https://example.com/image.jpg" },
  },
})

describe ("BookDetailPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("displays the book when successful", async () => {
      ;(fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => createMockBook(),
      })
  
      render(
      <MemoryRouter initialEntries={["/books/test-id"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/Загрузка/i)).toBeInTheDocument()

        await waitFor(() => {
        // Название книги
        expect(screen.getByText(/Test Book/)).toBeInTheDocument()

        // Автор
        expect(screen.getByText(/Test Author/)).toBeInTheDocument()

        // Описание
        expect(screen.getByText(/Описание/i)).toBeInTheDocument()
        expect(screen.getByText(/Test description/)).toBeInTheDocument()

        // Дата публикации
        expect(screen.getByText(/2025-01-01/)).toBeInTheDocument()

        // Рейтинг
        expect(screen.getByText(/4\/5/)).toBeInTheDocument()

        // Картинка
        const img = screen.getByRole("img") as HTMLImageElement
        expect(img).toHaveAttribute("src", "https://example.com/image.jpg")
        expect(img).toHaveAttribute("alt", "Test Book")
    })
    })
  
    it("shows message when loading error Internal Server Error", async () => {
      ;(fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      })
      render(
        <MemoryRouter>
          <BookDetailPage />
        </MemoryRouter>
      )
  
      const errorMessage = await screen.findByText(/Ошибка загрузки книги. Попробуйте позже./i)
      expect(errorMessage).toBeInTheDocument()
    })
  
    it("shows a message if the book is not found", async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => null,
    })

    render(
      <MemoryRouter initialEntries={["/books/test-id"]}>
        <Routes>
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Книга не найдена/i)).toBeInTheDocument()
    })
  })
})