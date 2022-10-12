import { KeyboardKey } from "./enums";
import { KeyboardNote } from "./keyboard-note";

export class KeyboardScale {
    private m_notes: KeyboardNote[];

    public constructor(notes: KeyboardNote[]) {
        this.m_notes = notes;
    }

    get Notes(): KeyboardNote[] {
        return this.m_notes.slice()
    }

    public static CMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C)
    ])
}