import type { COLORS } from "../common/colors";
import type EditorNode from "./EditorNode.svelte";
import { v4 as uuid } from "uuid"
import { drawBez, editor } from "./Editor";

export enum NHDirection {
    INPUT = "input",
    OUTPUT = "output"
}

export class IOType {
    typenames: string[];
    public color: COLORS;

    constructor(types: string[], color: COLORS) {
       this.typenames = types; 
       this.color = color;
    }
}

export class EditorNodeHandle {
    public type: IOType;
    offset: [number, number];
    pos: [number, number];
    cxns: EditorNodeHandle[];
    direction: NHDirection;
    parent: EditorNodeInfo;

    constructor(type: IOType, direction: NHDirection, parent: EditorNodeInfo) {
        this.type = type;
        this.offset = [0, 0];
        this.pos = [0, 0];
        this.cxns = [];
        this.direction = direction;
        this.parent = parent;
    }


    addCxn(cxn: EditorNodeHandle) {
        this.cxns.push(cxn);
    }

    removeCxn(cxn: EditorNodeHandle) {
        let idx = this.cxns.indexOf(cxn);
        this.cxns.splice(idx, 1)
    }

    cleanUp() {
        this.cxns.forEach((c) => {
            c.removeCxn(this)
        })

        this.cxns = []

        editor.ring();
    }

    drawCxns(ctx: CanvasRenderingContext2D) {
        this.cxns.forEach((x) => {
            drawBez(ctx, this.pos, x.pos, this.type.color, x.type.color)
        })
    }
}

export enum EditorNodeVariant {
    PROCESS = "process",
    UPLOAD = "upload",
    DOWNLOAD = "download"
}

export class EditorNodeType {
    public title: string;
    public color: COLORS;
    public variant: EditorNodeVariant;
    inputs: IOType[];
    outputs: IOType[];

    process: Function;

    constructor(title: string, color: COLORS, inputs: IOType[] = [], outputs: IOType[] = [], processCB: Function, variant: EditorNodeVariant = EditorNodeVariant.PROCESS) {
        this.title = title;
        this.color = color;
        this.inputs = inputs
        this.outputs = outputs
        this.variant = variant;
        this.process = processCB;
    }
}

export class EditorNodeInfo {
    public nodetype: EditorNodeType;
    public position: [number, number];
    public id: string;

    public inputs: EditorNodeHandle[];
    public outputs: EditorNodeHandle[];

    done: boolean = false;

    inputs_objs: any[];
    outputs_objs: any[];

    constructor(type: EditorNodeType) {
        this.nodetype = type;
        this.position = [0, 0];

        this.inputs = type.inputs.flatMap((e: IOType) => {return new EditorNodeHandle(e, NHDirection.INPUT, this)});
        this.outputs = type.outputs.flatMap((e: IOType) => {return new EditorNodeHandle(e, NHDirection.OUTPUT, this)});

        this.inputs_objs = []
        this.outputs_objs = []

        this.id = uuid();
    }


    async process_inputs() {
        console.log("process inputs")

        this.outputs_objs = await this.nodetype.process(this.inputs_objs)
        this.done = true;
        
        editor.ring()
        this.propogate();
    }

    propogate() {
        if(this.nodetype.variant == EditorNodeVariant.DOWNLOAD) {
            return;
        }

        for(let i = 0; i < this.outputs.length; i++) {
            if(this.outputs.at(i)?.cxns == undefined) {
                continue
            }

            for(let j = 0; j < (this.outputs.at(i)?.cxns.length || 0); i++) {
                this.outputs.at(i)?.cxns.at(j)?.parent.inputs_objs.push(this.outputs_objs)
                this.outputs.at(i)?.cxns.at(j)?.parent.process_inputs();
            }
        }
    }

    play() {
        if(this.nodetype.variant != EditorNodeVariant.UPLOAD) {
            return;
        }

        this.propogate();
    }
}