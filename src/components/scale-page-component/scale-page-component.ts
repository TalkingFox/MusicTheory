import './scale-page.css';
import { SoundService } from "../../services/sound-service";
import { KeyboardKey, KeyboardKeyModifier } from "../keyboard-component/enums";
import { KeyboardComponent } from "../keyboard-component/keyboard-component";
import { KeyboardComponentSettings } from "../keyboard-component/keyboard-component-settings";
import { KeyboardNote } from "../keyboard-component/keyboard-note";
import { KeyboardScale } from "../keyboard-component/keyboard-scale";
import { ScaleNotationComponent } from "../scale-notation-component/scale-notation-component";
import { ScalePageScale } from "./scale-page-scale";

export class ScalePageComponent {
    private m_keyboard: KeyboardComponent;
    private m_notation: ScaleNotationComponent;
    private m_playScale: HTMLButtonElement;
    private m_activeScale: ScalePageScale;

    private m_supportedScales: Map<string,ScalePageScale> = new Map([
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

    constructor() {
        this.buildPage();
    }

    private buildKeyboard(parentElement: HTMLElement): KeyboardComponent {
        var settings = new KeyboardComponentSettings();
        settings.parent = parentElement;
        settings.numberOfKeys = 56;
        settings.octave = 1;
        settings.startingNote = new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Natural);
        
        var soundService = new SoundService();
        return new KeyboardComponent(settings, soundService);
    }

    private renderSupportedScales(parentElement: HTMLElement): void {    
        const listElement = document.createElement('ul');
        listElement.id = 'scale-parent';
        this.m_supportedScales.forEach((scale: ScalePageScale) => {
            const scaleElement = document.createElement('li');
            scaleElement.textContent = scale.Name;
            scaleElement.classList.add('scale-link');
            scaleElement.addEventListener('click', () => {
                this.updateScaleElements(scale);
            });

            
            listElement.appendChild(scaleElement);
        });
        parentElement.appendChild(listElement);
    }

    private updateScaleElements(scale: ScalePageScale): void {
        this.m_activeScale = scale;
        this.m_notation.renderScale(1000, scale.Notes);
        this.m_playScale.textContent = `Play ${scale.Name} Scale`;
    }

    private buildPage(): void {
        const scaleContainer = document.createElement('div');
        scaleContainer.id = 'scale-container';
        this.renderSupportedScales(scaleContainer);
        document.body.appendChild(scaleContainer);
    
        var buttonParent = document.createElement('div');
        buttonParent.id = 'play-scale-parent';
        var button = document.createElement('button')
        button.id = 'play-scale';
        button.textContent = "Play C Major Scale"
        button.addEventListener('click', () => {
            this.m_keyboard.playScale(this.m_activeScale.Notes, 4)
        });
        buttonParent.appendChild(button)
        document.body.appendChild(buttonParent);
        this.m_playScale = button;

        const notationContainer = document.createElement('div');
        notationContainer.id = 'notation-container';
        document.body.appendChild(notationContainer);
        this.m_notation = new ScaleNotationComponent(notationContainer);
        

        const keyboardContainer = document.createElement('div');
        keyboardContainer.id = 'keyboard-container';
        document.body.appendChild(keyboardContainer);
        this.m_keyboard = this.buildKeyboard(keyboardContainer);

        this.updateScaleElements(this.m_supportedScales.get('C Major'));
    }
}