import { act, useEffect, useRef, useState } from "react";
import { SoundService } from "../../services/sound-service/SoundService";
import exerciseData from './Exercises.json';
import './Exercises.css';
import { SoundServiceNote } from "../../services/sound-service/SoundServiceNote";
import { Factory } from "vexflow";

export interface ExercisesProps {
    soundService: SoundService
}

const Exercises = ({ soundService }: ExercisesProps) => {
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [measureIndex, setMeasureIndex] = useState(0);
    const [areNotesVisible, setAreNotesVisible] = useState(false);

    const activeExercise = exerciseData[exerciseIndex];
    const factoryRef = useRef<Factory>(null);


    const loadPreviousExercise = () => {
        setAreNotesVisible(false);
        if (factoryRef.current) {
            factoryRef.current.getContext().clear();
        }
        setExerciseIndex(exerciseIndex - 1);
        setMeasureIndex(0);
    };

    const loadNextExercise = () => {
        setAreNotesVisible(false);
        if (factoryRef.current) {
            factoryRef.current.getContext().clear();
        }
        setExerciseIndex(exerciseIndex + 1);
        setMeasureIndex(0);
    };

    const loadPreviousMeasure = () => {
        setMeasureIndex(measureIndex - 1);
    };

    const loadNextMeasure = () => {
        setMeasureIndex(measureIndex + 1);
    };

    const showNotes = () => {
        setAreNotesVisible(true);
        const height = 300;
        const width = window.innerWidth * 0.75;

        if (!factoryRef.current) {
            factoryRef.current = new Factory({
                renderer: {
                    elementId: 'notes-container',
                    height: height,
                    width: width
                }
            });
        }

        const factory = factoryRef.current;

        const score = factory.EasyScore();
        score.set({ time: activeExercise.timeSignature });

        const measureWidth = width / activeExercise.measures.length;
        activeExercise.measures.forEach((measure, index) => {
            const system = factory.System({
                x: measureWidth * index,
                y: 0,
                width: measureWidth,
                spaceBetweenStaves: 10
            });

            const syntaxNotes = measure.map((note) => {
                const parts = note.split('-');
                let noteKind = '/q';
                switch (parts[1]) {
                    case '1n':
                        noteKind = '/w';
                        break;
                    case '2n':
                        noteKind = '/h';
                        break;
                    case '4n':
                        noteKind = '/q';
                        break;
                    case '8n':
                        noteKind = '/8';
                        break;
                }
                return `${parts[0]}${noteKind}`;
            }).join(',');

            const staff = system.addStave({
                voices: [
                    score.voice(score.notes(
                        syntaxNotes, { clef: 'treble' }
                    ))
                ]
            });

            if (index == 0) {
                staff.addClass('treble')
                    .addTimeSignature(activeExercise.timeSignature)
                    .addKeySignature(activeExercise.signature);

                system.addConnector('brace');
                system.addConnector('singleRight');
                system.addConnector('singleLeft');
            }
        });

        factory.draw();

    };

    const playMeasure = () => {
        const notes = activeExercise.measures[measureIndex]
            .map((note) =>
                SoundServiceNote.fromToneSyntax(note)
            );
        soundService.PlayNotes(notes);
    };

    const playFullMelody = () => {
        const melodyNotes = activeExercise.measures
            .flatMap((notes) => notes.map(note =>
                SoundServiceNote.fromToneSyntax(note)
            ));
        soundService.PlayNotes(melodyNotes);
    };

    const notesClasses = ['notes-container'];
    if (!areNotesVisible) {
        notesClasses.push('notes-shaded');
    }

    return <>
        <div className="exercise-description-container">
            <button onClick={loadPreviousExercise} disabled={exerciseIndex == 0}>&lt;</button>
            <span>Exercise {exerciseIndex + 1}</span>
            <button onClick={loadNextExercise} disabled={exerciseIndex == exerciseData.length - 1}>&gt;</button>
        </div>
        <div id='notes-container' className={notesClasses.join(' ')}></div>
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