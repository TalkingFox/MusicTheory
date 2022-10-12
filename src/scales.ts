import { KeyboardKey, KeyboardKeyModifier } from './components/keyboard-component/enums';
import { KeyboardComponent } from './components/keyboard-component/keyboard-component';
import { KeyboardComponentSettings } from './components/keyboard-component/keyboard-component-settings';
import { KeyboardNote } from './components/keyboard-component/keyboard-note';
import { KeyboardScale } from './components/keyboard-component/keyboard-scale';
import { SoundService } from './services/sound-service';

function renderPage() {
    var container = document.createElement('div');
    var settings = new KeyboardComponentSettings();
    settings.parent = container;
    settings.numberOfKeys = 32;
    settings.octave = 4;
    settings.startingNote = new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Natural);
    
    var soundService = new SoundService();
    var keyboard = new KeyboardComponent(settings, soundService);
    
    var button = document.createElement('button')
    button.textContent = "Play C Major Scale"
    button.addEventListener('click', () => {
        keyboard.playScale(KeyboardScale.CMajor)
    });

    document.body.appendChild(button);
    document.body.appendChild(container);
}

renderPage()