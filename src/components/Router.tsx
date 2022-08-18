import { Routes, Route } from 'react-router-dom'
import History from '../pages/history/History'
import Home from '../pages/home/Home'

export function Router(){
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='history' element={<History/>}/>
        </Routes>
    )
}
