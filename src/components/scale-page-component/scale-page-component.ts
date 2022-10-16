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
        const supportedScales: ScalePageScale[] = [
            {
                Notes: KeyboardScale.CMajor,
                Name: 'C Major'
            },
            {
                Name: 'FMajor',
                Notes: KeyboardScale.FMajor
            }
        ];
    
        const listElement = document.createElement('ul');
        supportedScales.forEach((scale: ScalePageScale) => {
            const scaleElement = document.createElement('li');
            scaleElement.textContent = scale.Name;
            scaleElement.classList.add('scale-link');
            
            
            listElement.appendChild(scaleElement);
        });
        parentElement.appendChild(listElement);
    }

    private updateScaleElements(): void {

    }

    private renderNotation(parentElement: HTMLElement): void {
        this.m_notation = new ScaleNotationComponent(parentElement);
        this.m_notation.renderScale(1000);
    }

    private buildPage(): void {
        const scaleContainer = document.createElement('div');
        scaleContainer.id = 'scale-container';
        this.renderSupportedScales(scaleContainer);
        document.body.appendChild(scaleContainer);
    
        const notationContainer = document.createElement('div');
        notationContainer.id = 'notation-container';
        document.body.appendChild(notationContainer);
        this.renderNotation(notationContainer);
    
        var button = document.createElement('button')
        button.textContent = "Play C Major Scale"
        button.addEventListener('click', () => {
            this.m_keyboard.playScale(KeyboardScale.CMajor, 4)
        });
        document.body.appendChild(button);

        const keyboardContainer = document.createElement('div');
        keyboardContainer.id = 'keyboard-container';
        document.body.appendChild(keyboardContainer);
        this.m_keyboard = this.buildKeyboard(keyboardContainer);
    }

    
}