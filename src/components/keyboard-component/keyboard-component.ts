import './keyboard.css';
import { SoundNoteModifier, SoundService, SoundServiceNote } from "../../services/sound-service";
import { KeyboardKey, KeyboardKeyModifier } from "./enums";
import { KeyboardComponentSettings } from "./keyboard-component-settings";
import { KeyboardNote } from "./keyboard-note";
import { KeyboardScale } from './keyboard-scale';

class KeyboardNode {
    public Notes: KeyboardNote[];
    public Next: KeyboardNode;

    public constructor(keys: KeyboardNote[]) {
        this.Notes = keys;
    }
}

class KeyboardChain {
    private Nodes: KeyboardNode[];

    public constructor() {
        this.Nodes = [];
        var nodeOrder = [
            [new KeyboardNote(KeyboardKey.C)],
            [
                new KeyboardNote(KeyboardKey.C, KeyboardKeyModifier.Sharp),
                new KeyboardNote(KeyboardKey.D, KeyboardKeyModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.D)],
            [
                new KeyboardNote(KeyboardKey.D, KeyboardKeyModifier.Sharp),
                new KeyboardNote(KeyboardKey.E, KeyboardKeyModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.E)],
            [new KeyboardNote(KeyboardKey.F)],
            [
                new KeyboardNote(KeyboardKey.F, KeyboardKeyModifier.Sharp),
                new KeyboardNote(KeyboardKey.G, KeyboardKeyModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.G)],
            [
                new KeyboardNote(KeyboardKey.G, KeyboardKeyModifier.Sharp),
                new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.A)],
            [
                new KeyboardNote(KeyboardKey.A, KeyboardKeyModifier.Sharp),
                new KeyboardNote(KeyboardKey.B, KeyboardKeyModifier.Flat)],
            [new KeyboardNote(KeyboardKey.B)]
        ]
        nodeOrder.forEach((keys: KeyboardNote[], index: number) => {
            var node = new KeyboardNode(keys)
            this.Nodes.push(node);

            if (this.Nodes.length > 1) {
                var previous = this.Nodes[index-1];
                previous.Next = node;
            }            
            if (index == nodeOrder.length - 1) {
                node.Next = this.Nodes[0];
            }
        });
    }

    public getNode(compareNote: KeyboardNote): KeyboardNode {
        var matchingNode = this.Nodes.find((node: KeyboardNode) => {
            return node.Notes.some((sourceNote: KeyboardNote) => {
                return sourceNote.Key == compareNote.Key && sourceNote.Modifier == compareNote.Modifier;
            });
        });
        return matchingNode;
    }
}

export class KeyboardComponent {
    private m_soundService: SoundService;
    private m_modifierMap: Map<KeyboardKeyModifier, SoundNoteModifier> = new Map<KeyboardKeyModifier, SoundNoteModifier>([
        [KeyboardKeyModifier.Natural, SoundNoteModifier.Natural],
        [KeyboardKeyModifier.Flat, SoundNoteModifier.Flat],
        [KeyboardKeyModifier.Sharp, SoundNoteModifier.Sharp],
    ]);
    private m_reverseModifierMap: Map<SoundNoteModifier, KeyboardKeyModifier> = new Map<SoundNoteModifier, KeyboardKeyModifier>([
        [SoundNoteModifier.Natural, KeyboardKeyModifier.Natural],
        [SoundNoteModifier.Flat, KeyboardKeyModifier.Flat],
        [SoundNoteModifier.Sharp, KeyboardKeyModifier.Sharp],
    ]);


    public constructor(settings: KeyboardComponentSettings, soundService: SoundService) {
        this.m_soundService = soundService;
        var keyboard = this.construct(settings);
        this.registerEvents();
        settings.parent.appendChild(keyboard);
    }

    public registerEvents(): void {
        this.m_soundService.onNotePlayed((note: SoundServiceNote) => {
            const modifier = this.m_reverseModifierMap.get(note.Modifier);
            const modifierString = modifier.toString();
            const elementId = `${note.Note}${note.octave.toString()}${modifierString}`;

            const element = document.getElementById(elementId);
            element.classList.add('pressed');
            setTimeout(() => {
                element.classList.remove('pressed');
            }, 250);
        });
    }

    public async playScale(scale: KeyboardScale, octave: number) : Promise<void> {        
        const firstNote = scale.Notes[0];
        let soundServiceNotes = scale.Notes.map((note: KeyboardNote, index: number) => {
            if (note.Key == firstNote.Key && index != 0) {
                octave += 1;
            }
            let soundServiceNote = new SoundServiceNote();
            soundServiceNote.Note = KeyboardKey[note.Key];
            soundServiceNote.Modifier = this.m_modifierMap.get(note.Modifier);
            soundServiceNote.octave = octave;
            
            return soundServiceNote;
        });        
        this.m_soundService.PlayNotes(soundServiceNotes);
    }

    private construct(settings: KeyboardComponentSettings): Element {
        var container = document.createElement('div');
        var keyboardChain = new KeyboardChain();

        var currentNode = keyboardChain.getNode(settings.startingNote);
        var currentOctave = settings.octave;

        for (var i = 0; i < settings.numberOfKeys; i++) {
            var keyElement = document.createElement('button');
            var firstNote = currentNode.Notes[0];
            
            keyElement.dataset.note = KeyboardKey[firstNote.Key];
            keyElement.dataset.octave = currentOctave.toString();
            keyElement.dataset.modifier = firstNote.Modifier.toString();
            keyElement.id = `${keyElement.dataset.note}${keyElement.dataset.octave}${keyElement.dataset.modifier}`

            keyElement.classList.add('keyboard-key');
            if (firstNote.Modifier === KeyboardKeyModifier.Natural) {
                keyElement.classList.add('white');
            } else {
                keyElement.classList.add('black');
            }
            keyElement.addEventListener('click', (event: MouseEvent) => {                
                var clickedElement = event.target as HTMLButtonElement;
                var noteToPlay = clickedElement.dataset.note;
                
                var modifierLookup = clickedElement.dataset.modifier as keyof typeof KeyboardKeyModifier;
                var modifierToPlay = KeyboardKeyModifier[modifierLookup];
                var noteModifierToPlay = this.m_modifierMap.get(modifierToPlay);
                var octaveToPlay =  clickedElement.dataset.octave;

                var soundServiceNote = new SoundServiceNote();
                soundServiceNote.Note = noteToPlay;
                soundServiceNote.Modifier = noteModifierToPlay;
                soundServiceNote.octave = Number(octaveToPlay);
                
                this.m_soundService.PlayNote(soundServiceNote);
            });
            if (firstNote.Key == KeyboardKey.B) {
                currentOctave += 1;
            }

            container.appendChild(keyElement);
            currentNode = currentNode.Next;
        }

        return container;
    }
}