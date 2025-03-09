import { KeyboardNote } from "../../common/KeyboardNote";

export class KeyboardNode {
    public Notes: KeyboardNote[];
    public Next?: KeyboardNode;

    public constructor(keys: KeyboardNote[]) {
        this.Notes = keys;
    }
}