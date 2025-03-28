
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import {BrowserRouter as Router  , Route, Routes} from 'react-router-dom'
import Home from './pages/Home'

import Footer from './pages/Footer'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProjectView from './pages/ProjectView'


function App() {
  return (
  <>
   <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            {/* <ModeToggle/> */}
            <Routes>
              <Route  path='/' element={<Home/>}/>
              <Route  path='/project/:id' element={<ProjectView/>}/>
            </Routes>
            <Footer/>
            <ToastContainer position="bottom-right" theme="dark" />
          </Router>
   </ThemeProvider>
  </>
  )
}

export default App
