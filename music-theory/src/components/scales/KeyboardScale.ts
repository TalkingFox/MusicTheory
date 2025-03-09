import { KeyboardKey } from "../../common/KeyboardEnums";
import { KeyboardNote } from "../../common/KeyboardNote";
import { NoteModifier } from "../../common/NoteModifier";

export class KeyboardScale {
    private m_notes: KeyboardNote[];
    private m_signature: string | undefined;

    // See supported signatures: https://github.com/0xfe/vexflow/blob/d65d409d0a4788d8e39222bc7508dcb91acd9871/tests/vexflow_test_helpers.ts
    public constructor(notes: KeyboardNote[], signature?: string) {
        this.m_notes = notes;
        this.m_signature = signature;
    }

    get Signature(): string | undefined {
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
    ], 'Am');

    public static BFlatMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.B, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, NoteModifier.Flat),
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
        new KeyboardNote(KeyboardKey.C, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.D, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.F, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.G, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.A, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C)
    ]);

    public static DMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D)
    ], 'Dm');

    public static DMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.D)
    ], 'D');

    public static EMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.E),
        new KeyboardNote(KeyboardKey.F, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E),
    ], 'Em');

    public static EFlatMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.E, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.B, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E, NoteModifier.Flat),
    ], 'Eb');


    public static FMajor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, NoteModifier.Flat),
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
        new KeyboardNote(KeyboardKey.F, NoteModifier.Sharp),
        new KeyboardNote(KeyboardKey.G)
    ], 'G')

    public static GMinor: KeyboardScale = new KeyboardScale([
        new KeyboardNote(KeyboardKey.G),
        new KeyboardNote(KeyboardKey.A),
        new KeyboardNote(KeyboardKey.B, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.C),
        new KeyboardNote(KeyboardKey.D),
        new KeyboardNote(KeyboardKey.E, NoteModifier.Flat),
        new KeyboardNote(KeyboardKey.F),
        new KeyboardNote(KeyboardKey.G)
    ], 'Gm')
}