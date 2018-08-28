import {Flashbang} from "../../flashbang/core/Flashbang";
import {KeyCode} from "../../flashbang/input/KeyCode";
import {Dialog} from "./Dialog";
import {TextInputPanel} from "./TextInputPanel";

/** Allows the user to copy the current sequence. */
export class CopySequenceDialog extends Dialog<void> {
    public constructor(sequence: string) {
        super();
        this._sequence = sequence;
    }

    protected added(): void {
        super.added();

        let inputPanel = new TextInputPanel();
        inputPanel.title = "Current sequence";
        let sequenceField = inputPanel.addField("Sequence", 200, true);
        sequenceField.text = this._sequence;
        sequenceField.readOnly = true;
        this.addObject(inputPanel, this.container);

        sequenceField.setFocus(true);

        inputPanel.setHotkeys(KeyCode.Enter, null, KeyCode.Escape, null);

        inputPanel.cancelClicked.connect(() => this.close(null));
        inputPanel.okClicked.connect(() => this.close(null));

        let updateLocation = () => {
            inputPanel.display.position.x = (Flashbang.stageWidth - inputPanel.width) * 0.5;
            inputPanel.display.position.y = (Flashbang.stageHeight - inputPanel.height) * 0.5;
        };

        updateLocation();
        this.regs.add(this._mode.resized.connect(updateLocation));
    }

    private readonly _sequence: string;
}
