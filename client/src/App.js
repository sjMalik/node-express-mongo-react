
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import NewAuthor from "./components/author/NewAuthor";
import Authors from "./components/author/Authors";
import Author from "./components/author/Author";
import UpdateAuthor from "./components/author/UpdateAuthor";
import NewBook from "./components/book/NewBook";
import Books from "./components/book/Books";
import ViewBook from "./components/book/ViewBook";
import UpdateBook from "./components/book/UpdateBook";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <div className='container mt-5 mb-5'>
      <header>
        <nav className='header-nav'>
          <a className='header-title' href='/'>My Library</a>
          <ul>
            <li><a href='/authors'>Authors</a></li>
            <li><a href='/authors/new'>New Author</a></li>
            <li><a href='/books'>Books</a></li>
            <li><a href='/books/new'>New Book</a></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/authors' element={<Authors />}></Route>
        <Route path='/authors/new' element={<NewAuthor />}></Route>
        <Route path='/authors/:id' element={<Author />}></Route>
        <Route path='/authors/:id/edit' element={<UpdateAuthor />}></Route>
        <Route path='/books/new' element={<NewBook />}></Route>
        <Route path='/books' element={<Books />}></Route>
        <Route path='/books/:id' element={<ViewBook />}></Route>
        <Route path='/books/:id/edit' element={<UpdateBook />}></Route>
      </Routes>
    </div>
  );
}

export default App;
