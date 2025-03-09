import { KeyboardNote } from "../../common/KeyboardNote";
import { SoundService } from "../../services/sound-service/SoundService";
import { KeyboardChain } from "./KeyboardChain";
import KeyboardButton, { KeyboardButtonProps } from "./KeyboardButton";
import { KeyboardNode } from "./KeyboardNode";
import { KeyboardKey } from "../../common/KeyboardEnums";
import { SoundServiceNote } from "../../services/sound-service/SoundServiceNote";
import './Keyboard.css';

export interface KeyboardProps {
    soundService: SoundService,
    numberOfKeys: number,
    startingNote: KeyboardNote,
    octave: number
}

const Keyboard = ({ soundService, numberOfKeys, startingNote, octave }: KeyboardProps) => {
    const lookupChain = new KeyboardChain();

    const pianoElements: React.JSX.Element[] = [];
    const keyPropsByKey = new Map<string, KeyboardButtonProps>();
    let currentNode = lookupChain.getNode(startingNote);
    let currentOctave = octave;

    soundService.onNotePlayed((note: SoundServiceNote) => {
        const noteKey = `${note.Note}${note.octave}${note.Modifier}`;
        const pressedKey = keyPropsByKey.get(noteKey);
        if (!pressedKey) {
            return;
        }

        pressedKey.isPressed = true;
        console.log('Pressed Key');
        setTimeout(() => { pressedKey.isPressed = false }, 250);
    });

    const playNote = (soundServiceNote: SoundServiceNote) => {
        soundService.PlayNote(soundServiceNote);
    };

    for (let i = 0; i < numberOfKeys; i++) {
        var firstNote = currentNode.Notes[0];
        const key = `${firstNote.Key}${currentOctave}${firstNote.Modifier.toString()}`
        const keyProps: KeyboardButtonProps = {
            modifier: firstNote.Modifier,
            note: firstNote.Key,
            octave: currentOctave,
            isPressed: false,
            onPressed: playNote
        };
        keyPropsByKey.set(key, keyProps);
        const keyElement = <KeyboardButton
            key={key}
            {...keyProps}>
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