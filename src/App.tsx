import './App.css'
import Menu from './Components/Layout/Menu/Menu'
import Header from './Components/Layout/Header/Header'
import Main from './Components/Layout/Main/Main'
import Footer from './Components/Layout/Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Header />
      <div className="app">
        <Menu />
        <Main />
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App;