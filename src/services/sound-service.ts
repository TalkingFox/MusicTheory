import * as Tone from 'tone';

export enum SoundNoteModifier {
    Natural = '',
    Flat = 'b',
    Sharp = '#'
}

export class SoundServiceNote {
    public Note: String;
    public Modifier: SoundNoteModifier;
    public octave: number;

    public static fromToneSyntax(note: string): SoundServiceNote {
        const serviceNote = new SoundServiceNote();
        serviceNote.Note = note[0];

        if (note.length == 2) {
            serviceNote.Modifier = SoundNoteModifier.Natural;
            serviceNote.octave = Number(note[1]);
        }
        else {
            var modifier = note[1] as SoundNoteModifier;
            serviceNote.Modifier = modifier;
            serviceNote.octave = Number(note[2]);
        }

        return serviceNote;
    }
}

enum SoundServiceEvent {
    NotePlayed
}

class NotePressedEvent {
    public Body: SoundServiceNote;
    public get Kind(): SoundServiceEvent {
        return SoundServiceEvent.NotePlayed;
    }
    public constructor(body: SoundServiceNote) {
        this.Body = body;
    }
}

export class SoundService {
    private synth: Tone.Synth;

    public constructor() {
        this.synth = new Tone.Synth().toDestination();
    }

    public onNotePlayed(callback: (note: SoundServiceNote) => void): void {
        const eventName = SoundServiceEvent[SoundServiceEvent.NotePlayed];
        addEventListener(eventName, (event: Event) => {
            callback((<CustomEvent>event).detail);
        });
    }

    private dispatchEvent(event: NotePressedEvent) {
        const customEvent = new CustomEvent(
            SoundServiceEvent[event.Kind],
            { bubbles: true, detail: event.Body }
        );
        dispatchEvent(customEvent);
    }

    public PlayNotes(notes: SoundServiceNote[]): void {
        Tone.start().then(() => {
            Tone.Transport.stop();
            Tone.Transport.cancel();
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
            Tone.Transport.start();
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