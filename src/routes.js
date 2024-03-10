import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/default/Home';
import Secret from './pages/default/Secret';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/secret' element={<Secret />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;