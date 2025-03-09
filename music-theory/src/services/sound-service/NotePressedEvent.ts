import { SoundServiceEvents } from "./SoundServiceEvents";
import { SoundServiceNote } from "./SoundServiceNote";

export class NotePressedEvent {
    public Body: SoundServiceNote;
    public get Kind(): SoundServiceEvents {
        return SoundServiceEvents.NotePlayed;
    }
    public constructor(body: SoundServiceNote) {
        this.Body = body;
    }
}