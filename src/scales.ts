import { Vex } from 'vexflow';
import { KeyboardKey, KeyboardKeyModifier } from './components/keyboard-component/enums';
import { KeyboardComponent } from './components/keyboard-component/keyboard-component';
import { KeyboardComponentSettings } from './components/keyboard-component/keyboard-component-settings';
import { KeyboardNote } from './components/keyboard-component/keyboard-note';
import { KeyboardScale } from './components/keyboard-component/keyboard-scale';
import { ScaleNotationComponent } from './components/scale-notation-component/scale-notation-component';
import { SoundService } from './services/sound-service';

function buildKeyboard(parentElement: HTMLElement): KeyboardComponent {
    var settings = new KeyboardComponentSettings();
    settings.parent = parentElement;
    settings.numberOfKeys = 44;
    settings.octave = 1;
    settings.startingNote = new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Natural);
    
    var soundService = new SoundService();
    return new KeyboardComponent(settings, soundService);
}

function renderNotation(parentElement: HTMLElement): void {
    const scaleNotation = new ScaleNotationComponent(parentElement);
    scaleNotation.renderScale(1000);
}

function renderPage() {
    const notationContainer = document.createElement('div');
    notationContainer.id = 'notation-container';
    document.body.appendChild(notationContainer);
    renderNotation(notationContainer);

    const keyboardContainer = document.createElement('div');
    keyboardContainer.id = 'keyboard-container';
    document.body.appendChild(keyboardContainer);
    const keyboard = buildKeyboard(keyboardContainer);

    var button = document.createElement('button')
    button.textContent = "Play C Major Scale"
    button.addEventListener('click', () => {
        keyboard.playScale(KeyboardScale.CMajor, 4)
    });
    document.body.appendChild(button);
}

renderPage()