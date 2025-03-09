import { KeyboardNote } from "../../common/KeyboardNote";
import { SoundService } from "../../services/sound-service/SoundService";
import { KeyboardChain } from "./KeyboardChain";
import KeyboardButton, { KeyboardButtonHandles } from "./KeyboardButton";
import { KeyboardNode } from "./KeyboardNode";
import { KeyboardKey } from "../../common/KeyboardEnums";
import { SoundServiceNote } from "../../services/sound-service/SoundServiceNote";
import './Keyboard.css';
import { useRef } from "react";

export interface KeyboardProps {
    soundService: SoundService,
    numberOfKeys: number,
    startingNote: KeyboardNote,
    octave: number
}

const Keyboard = ({ soundService, numberOfKeys, startingNote, octave }: KeyboardProps) => {
    const lookupChain = new KeyboardChain();

    const pianoElements: React.JSX.Element[] = [];
    const keyHandlesByKey = new Map<string, React.RefObject<KeyboardButtonHandles>>();
    let currentNode = lookupChain.getNode(startingNote);
    let currentOctave = octave;

    soundService.Deregister('keyboard');
    soundService.onNotePlayed('keyboard', (note: SoundServiceNote) => {
        let noteKey = `${note.Note}${note.octave}${note.Modifier}`;
        let pressedKeyHandle = keyHandlesByKey.get(noteKey);
        if (!pressedKeyHandle) {
            const keyboardNote = new KeyboardNote(note.Note as KeyboardKey, note.Modifier);
            const matchingNode = lookupChain.getNode(keyboardNote);
            const matchingNote = matchingNode.Notes[0];
            noteKey = `${matchingNote.Key}${note.octave}${note.Modifier}`;
            pressedKeyHandle = keyHandlesByKey.get(noteKey);
        }
        if (!pressedKeyHandle) {
            console.log(`Could not find key ${noteKey}`);
            return;
        }

        pressedKeyHandle.current?.setPressed(true);
        setTimeout(() => { pressedKeyHandle.current?.setPressed(false) }, 250);
    });

    const playNote = (soundServiceNote: SoundServiceNote) => {
        soundService.PlayNote(soundServiceNote);
    };

    for (let i = 0; i < numberOfKeys; i++) {
        var firstNote = currentNode.Notes[0];
        const key = `${firstNote.Key}${currentOctave}${firstNote.Modifier.toString()}`
        const ref = useRef<KeyboardButtonHandles>(null) as React.RefObject<KeyboardButtonHandles>;
        keyHandlesByKey.set(key, ref);
        const keyElement = <KeyboardButton
            key={key}
            modifier={firstNote.Modifier}
            note={firstNote.Key}
            octave={currentOctave}
            onPressed={playNote}
            ref={ref}
        >
        </KeyboardButton>;

        if (firstNote.Key == KeyboardKey.B) {
            currentOctave += 1;
        }

        pianoElements.push(keyElement);
        currentNode = currentNode.Next as KeyboardNode;
    }

    return <div id='keyboard-container'>
        <div id='keyboard-parent'>
            {pianoElements}
        </div>
    </div>
};

export default Keyboard;