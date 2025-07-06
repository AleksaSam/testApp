import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BooksPage } from '../BooksPage'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import '@testing-library/jest-dom'

const createMockBooksResponse = () => ({
  items: [
    {
      id: "1",
      volumeInfo: {
        title: "Test Book",
        authors: ["Test Author"],
        imageLinks: { thumbnail: "https://example.com/image.jpg" },
      },
    },
  ],
})

describe("BooksPage", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("loads and displays books after searching", async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => createMockBooksResponse(),
    })

    render(
      <MemoryRouter>
        <BooksPage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/Найти по названию или автору.../i) as HTMLInputElement
    const button = screen.getByRole("button", { name: /Найти/i })

    fireEvent.change(input, { target: { value: "React" } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText("Test Book")).toBeInTheDocument()
      expect(screen.getByText("Test Author")).toBeInTheDocument()
    })
  })

  it("shows message when loading books fails", async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    })
    render(
      <MemoryRouter>
        <BooksPage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/Найти по названию или автору.../i) as HTMLInputElement
    const button = screen.getByRole("button", { name: /Найти/i })

    fireEvent.change(input, { target: { value: "Error case" } })
    fireEvent.click(button)

    const errorMessage = await screen.findByText(/Ошибка загрузки книг. Попробуйте позже./i)
    expect(errorMessage).toBeInTheDocument()
  })

  it("handles an empty list of books", async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }),
    })

    render(
      <MemoryRouter>
        <BooksPage />
      </MemoryRouter>
    )

    const input = screen.getByPlaceholderText(/Найти по названию или автору.../i) as HTMLInputElement
    const button = screen.getByRole("button", { name: /Найти/i })

    fireEvent.change(input, { target: { value: "Empty" } })
    fireEvent.click(button)

    await waitFor(() => {
      // Проверим, что нет книг
      expect(screen.queryByRole("img")).not.toBeInTheDocument()
    })
  })
})