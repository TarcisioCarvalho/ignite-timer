import { Button } from "./components/Button"
import {ThemeProvider} from 'styled-components'
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import Home from "./pages/home/Home"
import { BrowserRouter} from "react-router-dom"
import { Router } from "./components/Router"
import Header from "./components/Header/Header"
import { CyclesContextProvider } from "./contexts/CyclesContext"

function App() {
  

  return (<ThemeProvider theme={defaultTheme}>
             
              <BrowserRouter>
                <CyclesContextProvider>
                  <Router/>
                </CyclesContextProvider>
              </BrowserRouter>
          </ThemeProvider>)
}

export default App
