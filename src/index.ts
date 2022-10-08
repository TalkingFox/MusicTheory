import { KeyboardKey, KeyboardKeyModifier } from './components/keyboard-component/enums';
import { KeyboardComponent } from './components/keyboard-component/keyboard-component';
import { KeyboardComponentSettings } from './components/keyboard-component/keyboard-component-settings';
import { KeyboardNote } from './components/keyboard-component/keyboard-note';
import { SoundService } from './services/sound-service';

var container = document.createElement('div');
var settings = new KeyboardComponentSettings();
settings.parent = container;
settings.numberOfKeys = 32;
settings.octave = 4;
settings.startingNote = new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Natural);

var soundService = new SoundService();
var keyboard = new KeyboardComponent(settings, soundService);
document.body.appendChild(container);

// var button = document.createElement('button')
// button.textContent = "Make Sound"
// button.addEventListener('click', () => {
//     const synth = new Tone.Synth().toDestination();
//     synth.triggerAttackRelease('C4', '8n');
// });

// document.body.appendChild(button);

