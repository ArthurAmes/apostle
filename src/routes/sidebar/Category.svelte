<script lang="ts">
    import { COLORS, colorvariants } from "../common/colors";
	import type { EditorNodeType } from "../editor/EditorNode";
	import { vidtogif, vidtom4a, vidtomkv, vidtomov, vidtomp3, vidtomp4, vidtowebm } from "../editor/plugins/ffmpeg";
	import { videoinput, videooutput } from "../editor/plugins/video";
	import CategoryNode from "./CategoryNode.svelte";

    export let color: COLORS;
    export let title: string;

    let nodes1: EditorNodeType[] = [] 
    nodes1.push(videoinput)
    nodes1.push(videooutput)
    nodes1.push(vidtomp4)
    nodes1.push(vidtomp3)
    nodes1.push(vidtogif)
    nodes1.push(vidtomkv)
    nodes1.push(vidtowebm)
    nodes1.push(vidtomov)
    nodes1.push(vidtom4a)
</script>


<div class="rounded-2xl border-4 border-dashed p-4 mb-4 w-min-w {colorvariants.get(color)?.border}">
    <h1 class="font-mono text-3xl {colorvariants.get(color)?.text} pb-2 border-b-4 border-dashed {colorvariants.get(color)?.border}">{title}</h1>
    {#each nodes1 as n}
        <CategoryNode type={n} />
    {/each}
</div>