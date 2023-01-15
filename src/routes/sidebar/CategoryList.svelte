<script lang="ts">
	import { COLORS } from "../common/colors";
	import Category from "./Category.svelte";

	import { vidtogif, vidtom4a, vidtomkv, vidtomov, vidtomp3, vidtomp4, vidtowebm } from "../editor/plugins/ffmpeg";
	import { videoinput, videooutput, video_t } from "../editor/plugins/video";
	import { EditorNodeType, EditorNodeVariant } from "../editor/EditorNode";

    interface CategoryType {
        title: string,
        color: COLORS
    }

</script>

<div class="h-full min-w-min m-2 border-r-2 border-dashed border-neutral-700 p-4 z-50" style="overflow: hidden; overflow-y: scroll;">
    <Category title={"video"} color={COLORS.RED} />
</div>
