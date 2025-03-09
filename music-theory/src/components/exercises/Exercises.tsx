import { useState } from "react";
import { SoundService } from "../../services/sound-service/SoundService";
import exerciseData from './Exercises.json';
import './Exercises.css';

export interface ExercisesProps {
    soundService: SoundService
}

const Exercises = ({ soundService }: ExercisesProps) => {
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [measureIndex, setMeasureIndex] = useState(0);

    const loadPreviousExercise = () => {
    };

    const loadNextExercise = () => {

    };

    const loadPreviousMeasure = () => {

    };

    const loadNextMeasure = () => {

    };

    const showNotes = () => {

    };

    const playMeasure = () => {

    };

    const playFullMelody = () => {

    };

    const activeExercise = exerciseData[exerciseIndex];

    return <>
        <div className="exercise-description-container">
            <button onClick={loadPreviousExercise} disabled={exerciseIndex == 0}>&lt;</button>
            <span>Exercise {exerciseIndex + 1}</span>
            <button onClick={loadNextExercise} disabled={exerciseIndex == exerciseData.length - 1}>&gt;</button>
        </div>
        <div className="notes-container notes-shaded"></div>
        <div className="exercise-measure-container">
            <button onClick={loadPreviousMeasure} disabled={measureIndex == 0}>&lt;</button>
            <button onClick={playMeasure}>Play Measure {measureIndex + 1}</button>
            <button onClick={loadNextMeasure} disabled={measureIndex == activeExercise.measures.length - 1}>&gt;</button>
        </div>
        <div className="exercise-button-container">
            <button onClick={showNotes}>Show Notes</button>
            <button onClick={playFullMelody}>Play Full Melody</button>
        </div>
    </>
};

export default Exercises;