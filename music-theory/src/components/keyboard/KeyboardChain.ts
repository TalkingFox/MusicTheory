import { KeyboardKey } from "../../common/KeyboardEnums";
import { KeyboardNote } from "../../common/KeyboardNote";
import { NoteModifier } from "../../common/NoteModifier";
import { KeyboardNode } from "./KeyboardNode";

export class KeyboardChain {
    private Nodes: KeyboardNode[];

    public constructor() {
        this.Nodes = [];
        var nodeOrder = [
            [new KeyboardNote(KeyboardKey.C)],
            [
                new KeyboardNote(KeyboardKey.C, NoteModifier.Sharp),
                new KeyboardNote(KeyboardKey.D, NoteModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.D)],
            [
                new KeyboardNote(KeyboardKey.D, NoteModifier.Sharp),
                new KeyboardNote(KeyboardKey.E, NoteModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.E)],
            [new KeyboardNote(KeyboardKey.F)],
            [
                new KeyboardNote(KeyboardKey.F, NoteModifier.Sharp),
                new KeyboardNote(KeyboardKey.G, NoteModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.G)],
            [
                new KeyboardNote(KeyboardKey.G, NoteModifier.Sharp),
                new KeyboardNote(KeyboardKey.A, NoteModifier.Flat)
            ],
            [new KeyboardNote(KeyboardKey.A)],
            [
                new KeyboardNote(KeyboardKey.A, NoteModifier.Sharp),
                new KeyboardNote(KeyboardKey.B, NoteModifier.Flat)],
            [new KeyboardNote(KeyboardKey.B)]
        ]
        nodeOrder.forEach((keys: KeyboardNote[], index: number) => {
            var node = new KeyboardNode(keys)
            this.Nodes.push(node);

            if (this.Nodes.length > 1) {
                var previous = this.Nodes[index - 1];
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
        }) as KeyboardNode;
        return matchingNode;
    }
}