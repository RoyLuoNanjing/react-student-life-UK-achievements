import './App.css'
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/main/Main.js'
import Login from './pages/login/Login'
import { AuthComponent } from './components/Auth/AuthComponent'
import { history } from "./utils/history"
import Monoply from './components/Monoply/Monoply'
import Test from './pages/test/test'
function App () {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<AuthComponent><Main /></AuthComponent>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/test' element={<Test />}></Route>
        </Routes>
      </HistoryRouter>
    </div>
  )
}

export default App
