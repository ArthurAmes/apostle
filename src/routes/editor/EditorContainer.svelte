<script lang="ts">
	import { onMount } from "svelte";
    import { editor, Editor } from "./Editor";
	import type { EditorNodeInfo } from "./EditorNode";
	import EditorNode from "./EditorNode.svelte";

    let nodes: EditorNodeInfo[] = []

    editor.subscribe((e: Editor) => {
        nodes = e.nodes
    })

    let canvas: HTMLCanvasElement;
    let container: HTMLElement;
    let ctx: CanvasRenderingContext2D;

    onMount(() => {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        ctx = canvas.getContext('2d') || new CanvasRenderingContext2D();
        editor.setCanvas(ctx, canvas, [container.offsetLeft, container.offsetTop]);

        editor.subscribe((e: Editor) => {
            e.reset_canv();
        })
    })
</script>

<div class='container w-full h-full bg-[url("/img/grid.svg")]' bind:this={container}>
    <canvas class='w-full h-full' bind:this={canvas} />

    {#each nodes as n (n.id)}
        <EditorNode bind:node={n} />
    {/each}
</div>

<style>
    .container {
        position: relative
    }
</style>
