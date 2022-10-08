import * as Tone from 'tone';

export enum SoundNoteModifier {
    Natural = '',
    Flat = 'b',
    Sharp = '#'
}

export class SoundService {
    private synth: Tone.Synth;

    public constructor() {
        this.synth = new Tone.Synth().toDestination();
    }

    public PlayNote(note: string, modifier: SoundNoteModifier, octave: number): void {
        var note = `${note}${modifier}${octave.toString()}`
        var velocity = '8n';
        console.log(note);
        this.synth.triggerAttackRelease(note, velocity);
    }
}