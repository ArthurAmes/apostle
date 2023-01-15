<script lang="ts">
	import { claim_component, getAllContexts, onMount } from "svelte/internal";
	import { colorvariants } from "../common/colors";
	import { editor } from "./Editor";
	import { NHDirection, type EditorNodeHandle } from "./EditorNode"
    import { COLORS } from "../common/colors";

    export let self: EditorNodeHandle;

    export let cb: Function;

    let dragMode = false;

    let elem: HTMLElement;

    let offsetX = 0, offsetY = 0;

    const hPosBg = self.direction == NHDirection.INPUT ? "-30px" : "calc(100% + 10px)";
    const hPos = self.direction == NHDirection.INPUT ? "-40px" : "calc(100%)";
    
    onMount(() => {
        self.offset[0] = (elem.parentElement?.offsetLeft || 0) + elem.offsetLeft + 30;
        self.offset[1] = (elem.parentElement?.offsetTop || 0) + elem.offsetTop + 40;

        cb();
    })

    const dragcb = (e: MouseEvent) => {
        editor.reset_canv();
        editor.draw_bez(self.pos, [e.clientX - editor.canvasTranslate[0], e.clientY - editor.canvasTranslate[1]], self.type.color);
    }

    const mouseUp = (e: MouseEvent) => {
        if(!dragMode) {
            return;
        }

        dragMode = false;

        let nh = editor.getHoveredNH()

        if(nh == null || nh == self || nh.direction != NHDirection.INPUT) {
            editor.reset_canv();
        } else {
            self.addCxn(nh);
            nh.addCxn(self);
            editor.reset_canv();
        }
    }

    const mouseDown = (e: MouseEvent) => {
        if(self.direction == NHDirection.INPUT) {
            self.cleanUp();
            return;
        }

        dragMode = true;

        offsetX = e.clientX - self.pos[0];
        offsetY = e.clientY - self.pos[1];

        document.addEventListener('mousemove', dragcb)
        document.addEventListener('mouseup', (e: MouseEvent) => {
            e.stopPropagation();
            mouseUp(e);
            document.removeEventListener('mousemove', dragcb)
        })
    }

    const mouseOver = () => {
        editor.setHoveredNH(self)
    }

    const mouseExit = () => {
        editor.setHoveredNH(null);
    }
</script>

<div style="position: absolute; left: {hPosBg}; top: 5px; background: {self.type.color == COLORS.WHITE ? 'black' : 'white'}; width: 20px; height: 20px"></div>
<div class="crosshair" style="position: absolute; left: {hPos}; top: -6px" bind:this={elem} on:mousedown|stopPropagation|preventDefault={mouseDown} on:mouseover|preventDefault|stopPropagation={mouseOver} on:mouseleave={mouseExit}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={colorvariants.get(self.type.color)?.raw} class="w-10 h-10">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clip-rule="evenodd" />
    </svg>
</div>

<style>
    .crosshair {
        cursor: crosshair;
    }
</style>