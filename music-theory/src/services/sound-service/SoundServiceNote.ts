import { NoteModifier } from "../../common/NoteModifier";

export class SoundServiceNote {
    public Note: String;
    public Modifier: NoteModifier;
    public octave: number;

    public constructor(note: string, modifier: NoteModifier, octave: number) {
        this.Note = note;
        this.Modifier = modifier;
        this.octave = octave;
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

        const serviceNote = new SoundServiceNote(note, modifier, octave);
        return serviceNote;
    }
}