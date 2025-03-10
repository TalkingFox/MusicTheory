import { Synth } from "tone";
import { SoundServiceNote } from "./SoundServiceNote";
import * as Tone from 'tone';

export class SoundService {
    private synth: Synth;
    private sampler: Tone.Sampler;
    private noteCallbacks: Map<string, (note: SoundServiceNote) => void>;

    public constructor() {
        this.synth = new Synth().toDestination();
        this.synth.volume.value = -10;

        this.sampler = new Tone.Sampler({
            urls: {
                A0: "A0.mp3",
                C1: "C1.mp3",
                "D#1": "Ds1.mp3",
                "F#1": "Fs1.mp3",
                A1: "A1.mp3",
                C2: "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                A2: "A2.mp3",
                C3: "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                A3: "A3.mp3",
                C4: "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                A4: "A4.mp3",
                C5: "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                A5: "A5.mp3",
                C6: "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                A6: "A6.mp3",
                C7: "C7.mp3",
                "D#7": "Ds7.mp3",
                "F#7": "Fs7.mp3",
                A7: "A7.mp3",
                C8: "C8.mp3",
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();

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
                this.sampler.triggerAttackRelease(value.toneNote, value.source.NoteDuration, time);
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
                this.sampler.triggerAttackRelease(note, '8n', time);
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
            this.sampler.triggerAttackRelease(toneNote, velocity);
            this.noteCallbacks.forEach((callback) => {
                callback(note);
            });
        });
    }
}