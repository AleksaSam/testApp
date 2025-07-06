import { render, screen } from '@testing-library/react'
import { BookInfo } from '../BookInfo'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe("BookInfo", () => {
  it("displays all passed information", () => {
    render(
      <BookInfo
        title="Test Title"
        authors={['Alice', 'Bob']}
        publishedDate="2020"
        averageRating={4}
        plainTextDescription="Nice book"
      />
    )

    expect(screen.getByText(/Test Title/)).toBeInTheDocument()
    expect(screen.getByText(/Alice, Bob/)).toBeInTheDocument()
    expect(screen.getByText(/2020/)).toBeInTheDocument()
    expect(screen.getByText(/4\/5/)).toBeInTheDocument()
    expect(screen.getByText(/Nice book/)).toBeInTheDocument()
  })

  it("handles missing values gracefully", () => {
    render(<BookInfo title="No Info" />)

    expect(screen.getByText(/No Info/)).toBeInTheDocument()
    expect(screen.getByText(/Автор/)).toHaveTextContent(/Неизвестно/)
    expect(screen.getByText(/Дата публикации/)).toHaveTextContent(/—/)
    expect(screen.getByText(/Нет оценки/)).toBeInTheDocument()
    expect(screen.getByText(/Описание отсутствует/)).toBeInTheDocument()
  })
})