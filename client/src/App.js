
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
import Signin from "./components/auth/Signin";
import Dashboard from "./components/Dashboard";
import LibraryRoutes from "./components/common/LibraryRoutes";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

function App() {
  return (
    <div className='container mt-5 mb-5'>
      <Routes>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/resetPassword' element={<ResetPassword />}></Route>
        <Route path='/' element={<LibraryRoutes Component={Dashboard} />}></Route>
        <Route path='/authors' element={<LibraryRoutes Component={Authors} />}></Route>
        <Route path='/authors/new' element={<LibraryRoutes Component={NewAuthor} />}></Route>
        <Route path='/authors/:id' element={<LibraryRoutes Component={Author} />}></Route>
        <Route path='/authors/:id/edit' element={<LibraryRoutes Component={UpdateAuthor} />}></Route>
        <Route path='/books/new' element={<LibraryRoutes Component={NewBook} />}></Route>
        <Route path='/books' element={<LibraryRoutes Component={Books} />}></Route>
        <Route path='/books/:id' element={<LibraryRoutes Component={ViewBook} />}></Route>
        <Route path='/books/:id/edit' element={<LibraryRoutes Component={UpdateBook} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
