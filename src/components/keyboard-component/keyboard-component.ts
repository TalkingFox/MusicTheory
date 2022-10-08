import './keyboard.css';
import { SoundNoteModifier, SoundService } from "../../services/sound-service";
import { KeyboardKey, KeyboardKeyModifier } from "./enums";
import { KeyboardComponentSettings } from "./keyboard-component-settings";
import { KeyboardNote } from "./keyboard-note";

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
    private soundService: SoundService;
    private modifierMap: Map<KeyboardKeyModifier, SoundNoteModifier> = new Map<KeyboardKeyModifier, SoundNoteModifier>([
        [KeyboardKeyModifier.Natural, SoundNoteModifier.Natural],
        [KeyboardKeyModifier.Flat, SoundNoteModifier.Flat],
        [KeyboardKeyModifier.Sharp, SoundNoteModifier.Sharp],
    ]);


    public constructor(settings: KeyboardComponentSettings, soundService: SoundService) {
        this.soundService = soundService;
        var keyboard = this.construct(settings);
        settings.parent.appendChild(keyboard);
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
            keyElement.dataset.modifier = KeyboardKeyModifier[firstNote.Modifier]            

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
                var noteModifierToPlay = this.modifierMap.get(modifierToPlay);
                var octaveToPlay =  clickedElement.dataset.octave;

                this.soundService.PlayNote(
                    noteToPlay,
                    noteModifierToPlay,
                    Number(octaveToPlay)
                );
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