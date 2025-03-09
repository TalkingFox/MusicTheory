import './App.css'
import { Link, Route, Routes } from 'react-router'
import Scales from './components/scales/Scales';
import Exercises from './components/exercises/Exercises';
import Landing from './components/landing/Landing';

function App() {
    return (
        <>
            <div className="banner">
                <h2>Learning Music Theory</h2>
                <Navigation />
            </div>
            <Routes>
                <Route path="scales" element={<Scales />}></Route>
                <Route path="exercises" element={<Exercises />}></Route>
                <Route path="*" element={<Landing />} />
            </Routes>
        </>
    )
}

const Navigation = () => {
    return <div className='nav-container'>
        <Link className='nav-button' to="/scales">Scales</Link>
        <Link className='nav-button' to="/exercises">Exercises</Link>
    </div>
};

export default App
