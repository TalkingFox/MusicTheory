import { KeyboardKey } from "./KeyboardEnums";
import { NoteModifier } from "./NoteModifier";

export class KeyboardNote {
    public Key: KeyboardKey;
    public Modifier: NoteModifier;

    public constructor(key: KeyboardKey, modifier: NoteModifier = NoteModifier.Natural) {
        this.Key = key;
        this.Modifier = modifier;
    }
}