import { EasyScore, Factory } from "vexflow";
import { KeyboardKey } from "../keyboard-component/enums";
import { KeyboardScale } from "../keyboard-component/keyboard-scale";

export class ScaleNotationComponent {
    private m_factory: Factory

    constructor(parentElement: HTMLElement) {
        this.m_factory = new Factory({
            renderer: {
                elementId: parentElement.id,
                height: 300,
                width: 1000
            }
        });
    }

    private clear(): void {
        this.m_factory.getContext().clear();
    }

    public renderScale(width: number, scale: KeyboardScale)  {
        this.clear();

        const score = this.m_factory.EasyScore();
        score.set({time:'4/4'});

        this.renderTrebleClef(score, scale, width);
        this.renderBassClef(score, scale, width);
        
        this.m_factory.draw();
    }

    private renderTrebleClef(score: EasyScore, scale: KeyboardScale, width: number) {
        let octave = 4;
        const notesInSyntax = [];
        
        // Once up the scale
        for(let i=0;i<scale.Notes.length;i++) {
            const note = scale.Notes[i];
            if (i != 0 && note.Key == KeyboardKey.C) {
                octave += 1;
            }
            const noteInSyntax = `${note.Key.toString()}${octave}`;
            notesInSyntax.push(noteInSyntax);
        }

        //Once down the scale
        for(let i=scale.Notes.length-1;i>=0;i--) {
            const note = scale.Notes[i];
            if (i != scale.Notes.length -1  && note.Key == KeyboardKey.B) {
                octave -= 1;
            }
            const noteInSyntax = `${note.Key.toString()}${octave}`;
            notesInSyntax.push(noteInSyntax);
        }
        
        let currentIndex = 0;
        const measureWidth = width / 4;

        while (notesInSyntax.length > 0) {
            
            let system = this.m_factory.System({
                x: measureWidth * (currentIndex),
                y: 0,
                width: measureWidth,
                spaceBetweenStaves: 10
            });

            let notesToAdd = notesInSyntax.splice(0,4);
            notesToAdd[0] += '/q'; // Convert all notes to quarter notes.
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
                const firstNote = scale.Notes[0];
                const keySignature = `${firstNote.Key.toString()}${firstNote.Modifier.toString()}`
                stave.addClef('treble')
                    .addTimeSignature('4/4')
                    .addKeySignature(keySignature);
                system.addConnector('brace');
                system.addConnector('singleRight');
                system.addConnector('singleLeft');
            }
            currentIndex += 1;
        }
    }

    private renderBassClef(score: EasyScore, scale: KeyboardScale, width: number) {
        let octave = 3;
        if (scale.Notes[0].Key.toString() > 'D') {
            octave -= 1;
        }
        const notesInSyntax = [];
        
        // Once up the scale
        for(let i=0;i<scale.Notes.length;i++) {
            const note = scale.Notes[i];
            if (i != 0 && note.Key == KeyboardKey.C) {
                octave += 1;
            }
            const noteInSyntax = `${note.Key.toString()}${octave}`;
            notesInSyntax.push(noteInSyntax);
        }

        //Once down the scale
        for(let i=scale.Notes.length-1;i>=0;i--) {
            const note = scale.Notes[i];
            if (i != scale.Notes.length -1  && note.Key == KeyboardKey.B) {
                octave -= 1;
            }
            const noteInSyntax = `${note.Key.toString()}${octave}`;
            notesInSyntax.push(noteInSyntax);
        }
        
        let currentIndex = 0;
        const measureWidth = width / 4;

        while (notesInSyntax.length > 0) {
            
            let system = this.m_factory.System({
                x: measureWidth * (currentIndex),
                y: 75,
                width: measureWidth,
                spaceBetweenStaves: 10
            });

            let notesToAdd = notesInSyntax.splice(0,4);
            notesToAdd[0] += '/q'; // Convert all notes to quarter notes.
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
                const keySignature = `${firstNote.Key.toString()}${firstNote.Modifier.toString()}`
                stave.addClef('bass')
                    .addTimeSignature('4/4')
                    .addKeySignature(keySignature);
                system.addConnector('brace');
                system.addConnector('singleRight');
                system.addConnector('singleLeft');
            }
            currentIndex += 1;
        }
    }    
}