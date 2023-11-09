
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from "react-router-dom"
import NewAuthor from "./components/NewAuthor";
import Authors from "./components/Authors";
import Author from "./components/Author";
import UpdateAuthor from "./components/UpdateAuthor";

function App() {
  return (
    <div className='container mt-5'>
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
        <Route path='/authors' element={<Authors />}></Route>
        <Route path='/authors/new' element={<NewAuthor />}></Route>
        <Route path='/authors/:id' element={<Author />}></Route>
        <Route path='/authors/:id/edit' element={<UpdateAuthor />}></Route>
      </Routes>
    </div>
  );
}

export default App;
