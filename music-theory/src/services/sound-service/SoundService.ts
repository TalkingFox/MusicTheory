import { Synth } from "tone";
import { SoundServiceNote } from "./SoundServiceNote";
import * as Tone from 'tone';

export class SoundService {
    private synth: Synth;
    private noteCallbacks: Map<string, (note: SoundServiceNote) => void>;

    public constructor() {
        this.synth = new Synth().toDestination();
        this.synth.volume.value = -10;

        this.noteCallbacks = new Map<string, (note: SoundServiceNote) => void>();
    }

    public onNotePlayed(id: string, callback: (note: SoundServiceNote) => void): void {
        this.noteCallbacks.set(id, callback);
    }

    public Deregister(id: string) {
        this.noteCallbacks.delete(id);
    }

    public PlayNotes(serviceNotes: SoundServiceNote[]): void {
        const toneValues: { source: SoundServiceNote, toneNote: string, time: number }[] = [];
        serviceNotes.forEach((serviceNote, index) => {
            const toneValue = {
                source: serviceNote,
                toneNote: `${serviceNote.Note}${serviceNote.Modifier}${serviceNote.Octave.toString()}`,
                time: 0
            }
            if (index > 0) {
                const previousNote = toneValues[index - 1];
                toneValue.time += previousNote.time + Tone.Time(previousNote.source.NoteDuration).toSeconds();
            }
            toneValues.push(toneValue);
        });

        Tone.start().then(() => {
            const transport = Tone.getTransport();
            transport.stop();
            transport.cancel();

            const sequence = new Tone.Part((time, value) => {
                this.noteCallbacks.forEach((callback) => {
                    callback(value.source);
                });
                this.synth.triggerAttackRelease(value.toneNote, value.source.NoteDuration, time);
            }, toneValues);
            sequence.loop = false;
            sequence.start(0);
            transport.start();
        });
    }

    public PlayNotesFixed(notes: SoundServiceNote[]): void {
        Tone.start().then(() => {
            const transport = Tone.getTransport();
            transport.stop();
            transport.cancel();
            const toneNotes = notes.map((note: SoundServiceNote) => {
                return `${note.Note}${note.Modifier}${note.Octave.toString()}`;
            });
            const sequence = new Tone.Sequence((time, note) => {
                const soundServiceNote = SoundServiceNote.fromToneSyntax(note);
                this.noteCallbacks.forEach((callback) => {
                    callback(soundServiceNote);
                });
                this.synth.triggerAttackRelease(note, '8n', time);
            }, toneNotes);
            sequence.loop = false;
            sequence.start(0);
            transport.start();
        });
    }

    public PlayNote(note: SoundServiceNote): void {
        Tone.start().then(() => {
            const toneNote = `${note.Note}${note.Modifier}${note.Octave.toString()}`
            const velocity = '8n';
            this.synth.triggerAttackRelease(toneNote, velocity);
            this.noteCallbacks.forEach((callback) => {
                callback(note);
            });
        });
    }
}