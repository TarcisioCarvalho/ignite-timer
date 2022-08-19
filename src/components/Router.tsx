import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'

import History from '../pages/history/History'
import Home from '../pages/home/Home'
import Header from './Header/Header'

export function Router(){
    return(<>
        
        <Routes>
                <Route path='/' element={<DefaultLayout/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='history' element={<History/>}/>
                </Route>
        </Routes>
        </>
    )
}
