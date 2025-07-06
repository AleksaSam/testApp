import { render, screen, fireEvent } from '@testing-library/react'
import { BookSearch } from '../BookSearch'
import { vi, describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe("BookSearch", () =>{
    it("calls onSearch with input value", () => {
        const mockSearch = vi.fn()
        render(<BookSearch onSearch={(mockSearch)}/>)
        const input = screen.getByPlaceholderText(/Найти по названию или автору.../i)
        const button = screen.getByRole('button', {name: /Найти/i})
        fireEvent.change(input, { target: { value: "TypeScript" } })
        fireEvent.click(button)
        expect(mockSearch).toHaveBeenCalledWith("TypeScript")
    })
})