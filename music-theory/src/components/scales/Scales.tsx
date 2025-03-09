import { useMemo, useState } from "react";
import { KeyboardScale } from "./KeyboardScale";
import Notation from "../notation/Notation";
import Keyboard from "../keyboard/Keyboard";
import './Scales.css';

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

const Scales = () => {
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

    };

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
        <Keyboard></Keyboard>
    </>
};

export default Scales;