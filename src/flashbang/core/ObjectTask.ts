import {Container} from "pixi.js";
import {GameObjectBase} from ".";

export default class ObjectTask extends GameObjectBase {
    /* internal */
    _attachToDisplayList(displayParent: Container, displayIdx: number): void {
        throw new Error("Tasks cannot manage DisplayObjects");
    }
}
