import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {BooksPage} from './pages/BooksPage'
import {BookDetailPage} from './pages/BookDetailPage'
import './App.css'


function App() {

  return (
    <Routes>
      <Route path="/" element={<BooksPage />}/>
      <Route path="/book/:id" element={<BookDetailPage />}/>
    </Routes>
  )
}

export default App
