import React, { createContext, useState } from "react";
import { Header } from "./Components/Heading";
import { Trending } from "./Components/Trending";
import { Movie } from "./Components/Movies";
import { Series } from "./Components/Series";
import { Bookmarked } from "./Components/Bookmarked";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

export const BookmarkContext = createContext()
axios.defaults.baseURL = 'http://localhost:3001';


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [token, setToken] = useState("")
  const [bookmarkedResult, setBookmarkedResult] = useState("")
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

  return (
    <BookmarkContext.Provider value={{ loggedIn, setLoggedIn, token, setToken, bookmarkedResult, setBookmarkedResult }} >
      <main>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/series" element={<Series />} />
            <Route path="/bookmarked" element={<Bookmarked />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </main>
    </BookmarkContext.Provider>
  )
}

export default App;
