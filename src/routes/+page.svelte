<script lang="ts">
	import { Editor } from "./editor/Editor";
	import EditorContainer from "./editor/EditorContainer.svelte";
	import CategoryList from "./sidebar/CategoryList.svelte";
    import { ffmpeg_setup } from "./editor/plugins/ffmpeg";

    let editor = new Editor();
    ffmpeg_setup();
</script>

<div class="main-class h-screen w-screen flex flex-row bg-neutral-800 p-0 m-0">
    <CategoryList /> 
    <EditorContainer />
</div>

<style>
    .main-class {
        position: relative;
    }
</style>