import { NoteModifier } from "../../common/NoteModifier";
import { SoundServiceNote } from "../../services/sound-service/SoundServiceNote";

export interface KeyboardButtonProps {
    note: string;
    octave: number;
    modifier: NoteModifier,
    isPressed: boolean,
    onPressed: (note: SoundServiceNote) => void
}

const KeyboardButton = ({ note, octave, modifier, isPressed, onPressed }: KeyboardButtonProps) => {
    let className = 'keyboard-key';
    const colorClass = modifier == NoteModifier.Natural ? ' white' : ' black';
    className += colorClass;
    if (isPressed) {
        className += ' pressed'
    }

    const notePressed = (playSound: boolean) => {
        const soundServiceNote = new SoundServiceNote(note, modifier, octave);
        if (playSound) {
            onPressed(soundServiceNote);
        }
    };

    return <button className={className} onClick={() => notePressed(true)}></button>
}

export default KeyboardButton;