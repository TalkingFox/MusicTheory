import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";
import { NoteModifier } from "../../common/NoteModifier";
import { SoundServiceNote } from "../../services/sound-service/SoundServiceNote";

export interface KeyboardButtonProps {
    note: string;
    octave: number;
    modifier: NoteModifier,
    onPressed: (note: SoundServiceNote) => void
}

export interface KeyboardButtonHandles {
    setPressed: (isPressed: boolean) => void;
}

const KeyboardButton = forwardRef(function KeyboardButton({ note, octave, modifier, onPressed }: KeyboardButtonProps, ref: ForwardedRef<unknown>) {
    const [isPressed, setIsPressed] = useState(false);

    let className = 'keyboard-key';
    const colorClass = modifier == NoteModifier.Natural ? ' white' : ' black';
    className += colorClass;
    if (isPressed) {
        className += ' pressed'
    }

    const notePressed = () => {
        const soundServiceNote = new SoundServiceNote(note, modifier, octave);
        onPressed(soundServiceNote);
    };

    useImperativeHandle(ref, () => {
        return {
            setPressed(isPressed: boolean) {
                setIsPressed(isPressed);
            }
        }
    });

    return <button className={className} onClick={notePressed}></button>
});

export default KeyboardButton;