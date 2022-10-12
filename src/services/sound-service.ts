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
}

export class SoundService {
    private synth: Tone.Synth;

    public constructor() {
        this.synth = new Tone.Synth().toDestination();
    }

    public PlayNotes(notes: SoundServiceNote[]): void {
        Tone.start().then(() => {
            Tone.Transport.stop();
            var toneNotes = notes.map((note: SoundServiceNote) => {
                return `${note.Note}${note.Modifier}${note.octave.toString()}`;
            });
            const sequence = new Tone.Sequence((time, note) => {
                this.synth.triggerAttackRelease(note, '8n', time);
            }, toneNotes);
            sequence.loop = false;
            sequence.start(0);
            Tone.Transport.start();
        });
    }

    public PlayNote(note: SoundServiceNote): void {
        Tone.start().then(() => {
            var toneNote = `${note.Note}${note.Modifier}${note.octave.toString()}`
            var velocity = '8n';
            this.synth.triggerAttackRelease(toneNote, velocity);
        });
    }
}