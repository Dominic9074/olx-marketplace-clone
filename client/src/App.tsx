import './App.css'
import AppRouter from './routes/AppRouter.tsx'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  )
}

export default App
