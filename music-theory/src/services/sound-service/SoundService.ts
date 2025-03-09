import { Synth } from "tone";
import { SoundServiceNote } from "./SoundServiceNote";
import { SoundServiceEvents } from "./SoundServiceEvents";
import { NotePressedEvent } from "./NotePressedEvent";
import * as Tone from 'tone';

export class SoundService {
    private synth: Synth;

    public constructor() {
        this.synth = new Synth().toDestination();
        this.synth.volume.value = -10;
    }

    public onNotePlayed(callback: (note: SoundServiceNote) => void): void {
        const eventName = SoundServiceEvents[SoundServiceEvents.NotePlayed];
        addEventListener(eventName, (event: Event) => {
            callback((<CustomEvent>event).detail);
        });
    }

    private dispatchEvent(event: NotePressedEvent) {
        const customEvent = new CustomEvent(
            SoundServiceEvents[event.Kind],
            { bubbles: true, detail: event.Body }
        );
        dispatchEvent(customEvent);
    }

    public PlayNotes(notes: SoundServiceNote[]): void {
        Tone.start().then(() => {
            const transport = Tone.getTransport();
            transport.stop();
            transport.cancel();
            const toneNotes = notes.map((note: SoundServiceNote) => {
                return `${note.Note}${note.Modifier}${note.octave.toString()}`;
            });
            const sequence = new Tone.Sequence((time, note) => {
                const soundServiceNote = SoundServiceNote.fromToneSyntax(note);
                this.dispatchEvent(new NotePressedEvent(soundServiceNote));
                this.synth.triggerAttackRelease(note, '8n', time);
            }, toneNotes);
            sequence.loop = false;
            sequence.start(0);
            transport.start();
        });
    }

    public PlayNote(note: SoundServiceNote): void {
        Tone.start().then(() => {
            const toneNote = `${note.Note}${note.Modifier}${note.octave.toString()}`
            const velocity = '8n';
            this.synth.triggerAttackRelease(toneNote, velocity);
            this.dispatchEvent(new NotePressedEvent(note));
        });
    }
}