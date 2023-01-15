import type { EditorNodeInfo, EditorNodeHandle } from "./EditorNode";
import { writable } from "svelte/store";
import type EditorNode from "./EditorNode.svelte";
import { colorvariants, type COLORS } from "../common/colors";

export function drawBez(ctx: CanvasRenderingContext2D, start: [number, number], end: [number, number], from: COLORS, to: COLORS) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);

    let gradient = ctx.createLinearGradient(start[0], start[1], end[0], end[1])
    gradient.addColorStop(0, colorvariants.get(from)?.raw || '#00ff00');
    gradient.addColorStop(1, colorvariants.get(to)?.raw || '#00ff00')

    ctx.strokeStyle = gradient;
    ctx.bezierCurveTo(start[0]+200, start[1], end[0]-200, end[1], end[0], end[1]);
    ctx.lineWidth = 8;
    ctx.stroke();
}

export class Editor {
    private canvasCtx: CanvasRenderingContext2D | null;
    public canvasTranslate: [number, number];
    private hoveredHandle: EditorNodeHandle | null;
    private canvas: HTMLCanvasElement | null;
    private subs: Function[];
    nodes: EditorNodeInfo[];

    constructor() {
        this.nodes = [];
        this.subs = [];
        this.canvasCtx = null;
        this.canvasTranslate = [0, 0]
        this.canvas = null;
        this.hoveredHandle = null;
    }

    reset() {
        this.nodes.forEach((n) => {
            n.inputs_objs = [];
            n.done = false;
        })

        this.ring();
    }

    setCanvas(c: CanvasRenderingContext2D, canvas: HTMLCanvasElement, transform: [number, number]) {
        this.canvasCtx = c;
        this.canvasTranslate = transform;
        this.canvas = canvas;
    }

    ring() {
        this.subs.forEach((s) => {
            s(this);
        })
    }

    add_node(n: EditorNodeInfo) {
        this.nodes.push(n);

        this.ring();
    }

    remove_node(n: EditorNodeInfo) {
        let idx = this.nodes.indexOf(n)
        this.nodes.splice(idx, 1);

        this.ring();
    }

    setHoveredNH(n: EditorNodeHandle | null) {
        this.hoveredHandle = n;
    }

    getHoveredNH() {
        return this.hoveredHandle;
    }

    draw_bez(start: [number, number], end: [number, number], color: COLORS) {
        drawBez((this.canvasCtx || new CanvasRenderingContext2D()), start, end, color, color)
    }

    draw() {
        this.nodes.forEach((n) => {
            n.outputs.forEach((i) => {
                i.drawCxns((this.canvasCtx || new CanvasRenderingContext2D()));
            })
        })
    }

    reset_canv() {
        this.canvasCtx?.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);
        this.draw();
    }

    subscribe(listener: Function) {
        this.subs.push(listener)

        return () => {
            const idx = this.subs.indexOf(listener);
            this.subs.splice(idx, 1)
        }
    }
}

export const editor: Editor = new Editor();