import GraphicsUtil from "../GraphicsUtil";
import { Graphics } from "pixi.js";

test(`Switch Less Animated Graphics`, () => {

    let g: Graphics = GraphicsUtil.decrease(1, 1, 1, 1, null);
    expect(g).toBeDefined();
    expect(g.position).toBeDefined();
    expect(g.width).toBeDefined();
    expect(g.x).toBeDefined();
    expect(g.y).toBeDefined();
});

test(`Switch Rich Animations`, () => {

    let g: Graphics = GraphicsUtil.drawLeftTriangle(1);
    expect(g).toBeDefined();
    expect(g.position).toBeDefined();
    expect(g.width).toBeDefined();
    expect(g.x).toBeDefined();
    expect(g.y).toBeDefined();
});