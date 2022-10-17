import { KeyboardKey, KeyboardKeyModifier } from "./enums";
import { KeyboardNote } from "./keyboard-note";

export class KeyboardScale {
    private m_notes: KeyboardNote[];
    private m_signature: string;

    public constructor(notes: KeyboardNote[], signature?: string) {
        this.m_notes = notes;
        this.m_signature = signature;
    }

    get Signature(): string {
        return this.m_signature;
    }

    get Notes(): KeyboardNote[] {
        return this.m_notes.slice()
    }

    public static AMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A)
    ],'Am');

    public static BFlatMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat),
    ], 'Bb');

    public static CMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C)
    ], 'C');

    public static Chromatic: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.C, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.D, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.F, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.G, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C)
    ]);

    public static DMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D)
    ], 'Dm');

    public static DMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.D)
    ], 'D');

    public static EMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
    ], 'Em');

    public static EFlatMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.E, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E, KeyboardKeyModifier.Flat),
    ], 'Eb');
    

    public static FMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F)
    ], 'F')

    public static GMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F, KeyboardKeyModifier.Sharp),
        new KeyboardNote(KeyboardKey.G)
    ], 'G')
    
    public static GMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E, KeyboardKeyModifier.Flat),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G)
    ], 'Gm')
}