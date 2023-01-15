<script lang="ts">
    import { colorvariants } from "../common/colors";
    import type { EditorNodeType } from "../editor/EditorNode";
    import { editor } from "../editor/Editor";
	import { EditorNodeInfo } from "../editor/EditorNode";

    export let type: EditorNodeType;
    
    const onClick = () => {
        editor.add_node(new EditorNodeInfo(type))
    }
</script>


<div class="rounded-2xl border-4 p-4 mt-4 w-64 flex flex-row-reverse {colorvariants.get(type.color)?.border} hover:bg-white/10 active:bg-white/20" on:click={onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="{colorvariants.get(type.color)?.raw}" class="w-10 h-10 p-0 m-0">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
   
    <div class="place-items-center align-middle  flex w-full">   
        <h1 class="inline-block font-mono text-2xl text-left {colorvariants.get(type.color)?.text}">
            {type.title}
        </h1>
    </div>
</div>