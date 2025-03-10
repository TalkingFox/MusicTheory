import { NoteModifier } from "../../common/NoteModifier";

export class SoundServiceNote {
    public Note: string;
    public Modifier: NoteModifier;
    public Octave: number;
    public NoteDuration: string;

    public constructor(note: string, modifier: NoteModifier, octave: number, noteDuration: string = '8n') {
        this.Note = note;
        this.Modifier = modifier;
        this.Octave = octave;
        this.NoteDuration = noteDuration;
    }

    public static fromToneSyntax(toneSyntax: string): SoundServiceNote {
        const note = toneSyntax[0];
        let modifier: NoteModifier;
        let octave: number;

        if (toneSyntax.length == 2) {
            modifier = NoteModifier.Natural;
            octave = Number(toneSyntax[1]);
        }
        else {
            modifier = toneSyntax[1] as NoteModifier;
            octave = Number(toneSyntax[2]);
        }

        let duration = '8n';
        if (toneSyntax.includes('-')) {
            duration = toneSyntax.split('-')[1];
        }

        const serviceNote = new SoundServiceNote(note, modifier, octave, duration);
        return serviceNote;
    }

    public toToneSyntax(): string {
        return `${this.Note}${this.Modifier}${this.Octave}-${this.NoteDuration}`;
    }
}