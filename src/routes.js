import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/js/Home';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;