import { KeyboardKey, KeyboardKeyModifier } from "./keyboard-enums";

export class KeyboardNote {
    public Key: KeyboardKey;
    public Modifier: KeyboardKeyModifier;

    public constructor(key: KeyboardKey, modifier: KeyboardKeyModifier = KeyboardKeyModifier.Natural) {
        this.Key = key;
        this.Modifier = modifier;
    }
}