import { useMemo, useState } from "react";
import { KeyboardScale } from "./KeyboardScale";
import Notation from "../notation/Notation";
import Keyboard from "../keyboard/Keyboard";
import './Scales.css';
import { SoundService } from "../../services/sound-service/SoundService";
import { KeyboardNote } from "../../common/KeyboardNote";
import { KeyboardKey } from "../../common/KeyboardEnums";
import { NoteModifier } from "../../common/NoteModifier";
import { SoundServiceNote } from "../../services/sound-service/SoundServiceNote";

export interface ScalePageScale {
    Notes: KeyboardScale;
    Name: string;
}

function getSupportedScales(): Map<string, ScalePageScale> {
    const supportedScales: Map<string, ScalePageScale> = new Map([
        ['A Minor', {
            Notes: KeyboardScale.AMinor,
            Name: 'A Minor'
        }],
        ['Bb Major', {
            Notes: KeyboardScale.BFlatMajor,
            Name: 'Bb Major'
        }],
        ['C Major', {
            Notes: KeyboardScale.CMajor,
            Name: 'C Major'
        }],
        ['Chromatic Scale', {
            Notes: KeyboardScale.Chromatic,
            Name: 'Chromatic Scale'
        }],
        ['D Minor', {
            Notes: KeyboardScale.DMinor,
            Name: 'D Minor'
        }],
        ['D Major', {
            Notes: KeyboardScale.DMajor,
            Name: 'D Major'
        }],
        ['E Minor', {
            Notes: KeyboardScale.EMinor,
            Name: 'E Minor'
        }],
        ['Eb Major', {
            Notes: KeyboardScale.EFlatMajor,
            Name: 'Eb Major'
        }],
        ['F Major', {
            Notes: KeyboardScale.FMajor,
            Name: 'F Major'
        }],
        ['G Major', {
            Notes: KeyboardScale.GMajor,
            Name: 'G Major'
        }],
        ['G Minor', {
            Notes: KeyboardScale.GMinor,
            Name: 'G Minor'
        }],
    ]);
    return supportedScales;
}

export interface ScalesProps {
    soundService: SoundService
}

const Scales = ({ soundService }: ScalesProps) => {
    const scalesByName = useMemo(getSupportedScales, []);
    const [activeScale, setActiveScale] = useState<ScalePageScale>(scalesByName.get("C Major") as ScalePageScale);

    const updateScaleElements = (scale: ScalePageScale) => {
        setActiveScale(scale);
    };

    const scaleElements: React.JSX.Element[] = [];
    scalesByName.forEach((scale: ScalePageScale) => {
        const scaleElement = <li key={scale.Name} className="scale-link" onClick={() => updateScaleElements(scale)}>
            {scale.Name}
        </li>
        scaleElements.push(scaleElement);
    });

    const playScale = () => {
        let octave = 4;
        const scale = activeScale.Notes;
        let soundServiceNotes = scale.Notes.map((note: KeyboardNote, index: number) => {
            if (note.Key == KeyboardKey.C && index != 0 && scale.Notes[index - 1].Key != KeyboardKey.C) {
                octave += 1;
            }
            const serviceNote = KeyboardKey[note.Key];
            const modifier = note.Modifier;
            let soundServiceNote = new SoundServiceNote(serviceNote, modifier, octave);

            return soundServiceNote;
        });
        soundService.PlayNotes(soundServiceNotes);
    };

    const startingNote = new KeyboardNote(KeyboardKey.A, NoteModifier.Natural);

    return <>
        <div id='scale-container'>
            <ul id='scale-parent'>
                {scaleElements}
            </ul>
        </div>
        <div id='play-scale-parent'>
            <button id='play-scale' onClick={playScale}>Play {activeScale.Name} Scale</button>
        </div>
        <Notation notes={activeScale.Notes}></Notation>
        <Keyboard numberOfKeys={56} octave={1} startingNote={startingNote} soundService={soundService}></Keyboard>
    </>
};

export default Scales;