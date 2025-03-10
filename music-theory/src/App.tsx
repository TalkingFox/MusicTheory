import './App.css'
import { Link, Route, Routes } from 'react-router'
import Scales from './components/scales/Scales';
import Exercises from './components/exercises/Exercises';
import Landing from './components/landing/Landing';
import { SoundService } from './services/sound-service/SoundService';

const soundService: SoundService = new SoundService();

function App() {
    return (
        <>
            <div className="banner">
                <h2>Learning Music Theory</h2>
                <Navigation />
            </div>
            <Routes>
                <Route path="scales" element={<Scales soundService={soundService} />}></Route>
                <Route path="exercises" element={<Exercises soundService={soundService}/>}></Route>
                <Route path="*" element={<Landing/>} />
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
