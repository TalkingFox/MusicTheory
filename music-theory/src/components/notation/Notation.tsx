import { EasyScore, Factory } from "vexflow";
import { KeyboardScale } from "../scales/KeyboardScale";
import { useEffect, useRef } from "react";
import './Notation.css';
import { KeyboardKey } from "../../common/KeyboardEnums";

export interface NotationProps {
    notes: KeyboardScale
}

function renderScale(factory: Factory, width: number, scale: KeyboardScale) {
    factory.getContext().clear();

    const score = factory.EasyScore();
    score.set({ time: '4/4' });

    renderTrebleClef(factory, score, scale, width);
    renderBassClef(factory, score, scale, width);

    factory.draw();
}

function renderTrebleClef(factory: Factory, score: EasyScore, scale: KeyboardScale, width: number) {
    let octave = 4;
    const notesInSyntax = [];

    // Once up the scale
    for (let i = 0; i < scale.Notes.length; i++) {
        const note = scale.Notes[i];
        if (i != 0 && note.Key == KeyboardKey.C && scale.Notes[i - 1].Key != KeyboardKey.C) {
            octave += 1;
        }
        let noteInSyntax = '';
        if (scale.Signature) {
            noteInSyntax = `${note.Key.toString()}${octave}`;
        } else {
            noteInSyntax = `${note.Key.toString()}${note.Modifier.toString()}${octave}`;
        }
        notesInSyntax.push(noteInSyntax);
    }

    //Once down the scale
    for (let i = scale.Notes.length - 1; i >= 0; i--) {
        const note = scale.Notes[i];
        if (i != scale.Notes.length - 1 && note.Key == KeyboardKey.B) {
            octave -= 1;
        }
        const noteInSyntax = `${note.Key.toString()}${octave}`;
        notesInSyntax.push(noteInSyntax);
    }

    let currentIndex = 0;
    const measureWidth = width / 4;

    while (notesInSyntax.length > 0) {

        let system = factory.System({
            x: measureWidth * (currentIndex),
            y: 0,
            width: measureWidth,
            spaceBetweenStaves: 10
        });

        let notesToAdd = notesInSyntax.splice(0, 4);
        notesToAdd[0] += '/q'; // Convert all notes to quarter notes.
        while (notesToAdd.length != 4) {
            // pad with rests
            notesToAdd.push('d4/r');
        }
        const notesJoined = notesToAdd.join(',');

        let stave = system
            .addStave({
                voices: [
                    score.voice(
                        score.notes(
                            notesJoined,
                            {
                                clef: 'treble'
                            }
                        )
                    )
                ]
            });

        if (currentIndex == 0) {

            stave.addClef('treble')
                .addTimeSignature('4/4');
            if (scale.Signature) {
                stave.addKeySignature(scale.Signature);
            }

            system.addConnector('brace');
            system.addConnector('singleRight');
            system.addConnector('singleLeft');
        }
        currentIndex += 1;
    }
}

function renderBassClef(factory: Factory, score: EasyScore, scale: KeyboardScale, width: number) {
    let octave = 3;
    if (scale.Notes[0].Key.toString() > 'D') {
        octave -= 1;
    }
    const notesInSyntax = [];

    // Once up the scale
    for (let i = 0; i < scale.Notes.length; i++) {
        const note = scale.Notes[i];
        if (i != 0 && note.Key == KeyboardKey.C && scale.Notes[i - 1].Key != KeyboardKey.C) {
            octave += 1;
        }
        let noteInSyntax = '';
        if (scale.Signature) {
            noteInSyntax = `${note.Key.toString()}${octave}`;
        } else {
            noteInSyntax = `${note.Key.toString()}${note.Modifier.toString()}${octave}`;
        }
        notesInSyntax.push(noteInSyntax);
    }

    // Once down the scale
    for (let i = scale.Notes.length - 1; i >= 0; i--) {
        const note = scale.Notes[i];
        if (i != scale.Notes.length - 1 && note.Key == KeyboardKey.B) {
            octave -= 1;
        }
        const noteInSyntax = `${note.Key.toString()}${octave}`;
        notesInSyntax.push(noteInSyntax);
    }

    let currentIndex = 0;
    const measureWidth = width / 4;

    while (notesInSyntax.length > 0) {

        let system = factory.System({
            x: measureWidth * (currentIndex),
            y: 75,
            width: measureWidth,
            spaceBetweenStaves: 10
        });

        let notesToAdd = notesInSyntax.splice(0, 4);
        notesToAdd[0] += '/q'; // Convert all notes to quarter notes.
        while (notesToAdd.length != 4) {
            // pad with rests
            notesToAdd.push('d4/r');
        }
        const notesJoined = notesToAdd.join(',');

        let stave = system
            .addStave({
                voices: [
                    score.voice(
                        score.notes(
                            notesJoined,
                            {
                                clef: 'bass'
                            }
                        )
                    )
                ]
            });

        if (currentIndex == 0) {
            const firstNote = scale.Notes[0];
            stave.addClef('bass')
                .addTimeSignature('4/4')
            if (scale.Signature) {
                stave.addKeySignature(scale.Signature);
            }
            system.addConnector('brace');
            system.addConnector('singleRight');
            system.addConnector('singleLeft');
        }
        currentIndex += 1;
    }
}

const Notation = ({ notes }: NotationProps) => {
    const factoryRef = useRef<Factory>(null);

    useEffect(() => {
        const height = 300;
        const width = window.innerWidth * 0.75;
        if (!factoryRef.current) {
            factoryRef.current = new Factory({
                renderer: {
                    elementId: 'notation-container',
                    height: height,
                    width: width
                }
            });
            renderScale(factoryRef.current, width, notes);
        } else {
            renderScale(factoryRef.current, width, notes);
        }
    }, [notes]);

    return <div id='notation-container'>
    </div>
}

export default Notation;