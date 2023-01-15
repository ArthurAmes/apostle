<script lang="ts">
	import { onMount } from "svelte";
	import { colorvariants } from "../common/colors";
    import { EditorNodeVariant, type EditorNodeInfo } from "./EditorNode";
    import { editor } from "./Editor"
	import NodeHandle from "./NodeHandle.svelte";
    
    export let node: EditorNodeInfo;
    
    let filename: string | null;

    let offsetX = 0, offsetY = 0;

    let ele: HTMLElement;
    let inp: HTMLInputElement;

    const updatePos = () => {
        ele.style.top = node.position[1] + 'px';
        ele.style.left = node.position[0] + 'px';
    }

    const updateNodeHandles = () => {
        node.inputs.forEach((n) => {
            n.pos[0] = node.position[0] + n.offset[0];
            n.pos[1] = node.position[1] + n.offset[1];
        })

        node.outputs.forEach((n) => {
            n.pos[0] = node.position[0] + n.offset[0];
            n.pos[1] = node.position[1] + n.offset[1];
        })

        editor.ring();
    }

    onMount(() => {
        updatePos();
    });

    const mouseDown = (e: MouseEvent) => {
        offsetX = e.clientX - node.position[0];
        offsetY = e.clientY - node.position[1];

        document.addEventListener('mousemove', dragcb)
        document.addEventListener('mouseup', (e: MouseEvent) => {
            document.removeEventListener('mousemove', dragcb)
        })
    }

    const dragcb = (e: MouseEvent) => {
        let cX = e.clientX > window.innerWidth - ele.offsetWidth ? window.innerWidth - ele.offsetWidth : e.clientX;
        let cY = e.clientY > window.innerHeight - ele.offsetHeight ? window.innerHeight - ele.offsetHeight : e.clientY;

        node.position[0] = cX - offsetX > 0 ? cX - offsetX : 0;
        node.position[1] = cY - offsetY > 0 ? cY - offsetY : 0;

        updatePos();
        updateNodeHandles();
    }

    const removeNode = () => {
        node.inputs.forEach((x) => {
            x.cleanUp();
        })

        node.outputs.forEach((x) => {
            x.cleanUp();
        })

        editor.remove_node(node);
    }

    const onUpload = () => {
        for(let i = 0; i < (inp.files?.length || 0); i++) {
            node.outputs_objs.push(inp.files?.item(i));
        }

        filename = node.outputs_objs.at(0).name;
    }

    const onPlay = () => {
        editor.reset();
        node.play();
    }

    const downloadFile = () => {
        var link = document.createElement("a");
        link.download = "my-converted-file"
        link.href = node.inputs_objs.flat().at(0)
        link.click();
    }

</script>

<div class="editor-node rounded-2xl border-4 p-4 mt-4 mr-4 ml-4 w-64 flex flex-col {colorvariants.get(node.nodetype.color)?.border} bg-white/10" bind:this={ele} on:mousedown|preventDefault={mouseDown} >
    {#if node.nodetype.variant == EditorNodeVariant.PROCESS}
    <h1 class="font-mono text-2xl border-b-4 border-dashed pb-2 {colorvariants.get(node.nodetype.color)?.border} {colorvariants.get(node.nodetype.color)?.text}">
        {node.nodetype.title}
    </h1>
    {/if}

    {#if node.nodetype.variant == EditorNodeVariant.UPLOAD}
    <div class="flex flex-row pl-2">
        <input style="visibility: hidden; width: 0px; height: 0px;" type="file" id="uploader" bind:this={inp} on:input={onUpload}/>
        <label for="uploader">
            <div class="flex-col">
                <div class="rounded-2xl border-4 border-dashed flex align-middle justify-center pt-4 pb-4 hover:bg-white/40 {colorvariants.get(node.nodetype.color)?.border}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={colorvariants.get(node.nodetype.color)?.raw} class="w-24 h-24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
            </div>
        </label>
        <div class="flex flex-col p-4 pl-6 font-mono text-xl {colorvariants.get(node.nodetype.color)?.text}">
            <h1 class="grow-0">{(filename || "no file")}</h1>
            <h1 class="pointy text-2xl mt-4" on:click|preventDefault={onPlay}>RUN NODES</h1>
        </div>
    </div>
    {/if}

    {#if node.nodetype.variant == EditorNodeVariant.DOWNLOAD}
    <div class="rounded-2xl border-4 border-dashed flex align-middle justify-center pt-4 pb-4 hover:bg-white/40 {colorvariants.get(node.nodetype.color)?.border}" on:click={downloadFile}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={node.done ? '#a3e635' : colorvariants.get(node.nodetype.color)?.raw} class="w-24 h-24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    </div>
    {/if}

    <div style="position: absolute; top: -10px; right: -10px; background: white; width: 20px; height: 20px"></div>
    <div class="pointy" style="position: absolute; top: -20px; right: -20px;" on:mousedown|stopPropagation={() => {}} on:click={removeNode}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={colorvariants.get(node.nodetype.color)?.raw} class="w-10 h-10">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
        </svg>
    </div>

    {#each node.inputs as inp}
        <div style="position: relative" class="mt-4 w-full h-full">
            <NodeHandle cb={updateNodeHandles} bind:self={inp} />
              
            <div class="place-items-center align-middle flex w-full pl-2">
                <h1 class="font-mono text-xl text-left w-full {colorvariants.get(inp.type.color)?.text}">
                    {inp.type.typenames.join(" | ")}
                </h1>
            </div>
        </div>
    {/each}

    {#each node.outputs as out}
        <div style="position: relative" class="mt-4 w-full h-full">
            <NodeHandle cb={updateNodeHandles} bind:self={out} />
            
            <div class="place-items-center align-middle flex w-full pr-2">
                <h1 class="font-mono text-xl text-right w-full {colorvariants.get(out.type.color)?.text}">
                    {out.type.typenames.join(" | ")}
                </h1>
            </div>
        </div>
    {/each}


</div>

<style>
    .editor-node {
        position: absolute;
        cursor: grab;
        width: fit-content;
    }

    .pointy {
        cursor: pointer;
    }

</style>