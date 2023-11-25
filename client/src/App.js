
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom';
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
import AuthGuard from "./components/common/AuthGuard";
import Dashboard from "./components/Dashboard";
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
        <Route path='/' element={<AuthGuard Component={Dashboard} />}></Route>
        <Route path='/authors' element={<AuthGuard Component={Authors} />}></Route>
        <Route path='/authors/new' element={<AuthGuard Component={NewAuthor} />}></Route>
        <Route path='/authors/:id' element={<AuthGuard Component={Author} />}></Route>
        <Route path='/authors/:id/edit' element={<AuthGuard Component={UpdateAuthor} />}></Route>
        <Route path='/books/new' element={<AuthGuard Component={NewBook} />}></Route>
        <Route path='/books' element={<AuthGuard Component={Books} />}></Route>
        <Route path='/books/:id' element={<AuthGuard Component={ViewBook} />}></Route>
        <Route path='/books/:id/edit' element={<AuthGuard Component={UpdateBook} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
