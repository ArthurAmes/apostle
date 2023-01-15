import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { COLORS } from "../../common/colors";
import { Editor } from "../Editor";
import { EditorNodeType, EditorNodeVariant, IOType } from "../EditorNode";
import EditorNode from "../EditorNode.svelte";
import { video_t } from "./video";

const ffmpeg = createFFmpeg({ 
    log: true, 
    corePath: "http://192.168.0.110:8080/wasm/ffmpeg-core.js"
})

export const ffmpeg_setup = async () => {
    if(!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }
}

const vid_to_mp4 = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.mp4');

    const data = ffmpeg.FS('readFile', 'node-out.mp4');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_mp3 = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.mp3');

    const data = ffmpeg.FS('readFile', 'node-out.mp3');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_gif = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-t', '5', '-i', `node-in.${ext}`, '-r', '10', 'node-out.gif');

    const data = ffmpeg.FS('readFile', 'node-out.gif');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_mkv = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.mkv');

    const data = ffmpeg.FS('readFile', 'node-out.mkv');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_3gp = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.3gp');

    const data = ffmpeg.FS('readFile', 'node-out.3gp');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_webm = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.webm');

    const data = ffmpeg.FS('readFile', 'node-out.webm');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_mov = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.mov');

    const data = ffmpeg.FS('readFile', 'node-out.mov');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

const vid_to_m4a = async (inp: any) => {
    let toks = inp.flat()[0].name.split('.');
    let ext = toks[toks.length - 1]
    let file = await fetchFile(inp.flat()[0])

    ffmpeg.FS('writeFile', `node-in.${ext}`, file)

    await ffmpeg.run('-i', `node-in.${ext}`, 'node-out.m4a');

    const data = ffmpeg.FS('readFile', 'node-out.m4a');

    const output = URL.createObjectURL(new Blob([data.buffer]))

    return output;
}

export const mp4_t: IOType = new IOType(
    ['mp4'],
    COLORS.ORANGE
)

export const mp3_t: IOType = new IOType(
    ['mp3'],
    COLORS.GREEN
)

export const gif_t: IOType = new IOType(
    ['gif'],
    COLORS.BLUE
)

export const mkv_t: IOType = new IOType(
    ['mkv'],
    COLORS.WHITE
)

export const webm_t: IOType = new IOType(
    ['webm'],
    COLORS.PURPLE
)

export const mov_t: IOType = new IOType(
    ['mov'],
    COLORS.GREEN
)

export const m4a_t: IOType = new IOType(
    ['m4a'],
    COLORS.ORANGE
)

export const vidtomp4: EditorNodeType = new EditorNodeType(
    "to mp4", 
    COLORS.RED,
    [video_t],
    [mp4_t],
    vid_to_mp4,
    EditorNodeVariant.PROCESS
)

export const vidtomp3: EditorNodeType = new EditorNodeType(
    "to mp3",
    COLORS.RED,
    [video_t],
    [mp3_t],
    vid_to_mp3,
    EditorNodeVariant.PROCESS
)

export const vidtogif: EditorNodeType = new EditorNodeType(
    "to gif",
    COLORS.RED,
    [video_t],
    [gif_t],
    vid_to_gif,
    EditorNodeVariant.PROCESS
)

export const vidtomkv: EditorNodeType = new EditorNodeType(
    "to mkv",
    COLORS.RED,
    [video_t],
    [mkv_t],
    vid_to_mkv,
    EditorNodeVariant.PROCESS
)

export const vidtowebm: EditorNodeType = new EditorNodeType(
    "to webm",
    COLORS.RED,
    [video_t],
    [webm_t],
    vid_to_webm,
    EditorNodeVariant.PROCESS
)

export const vidtomov: EditorNodeType = new EditorNodeType(
    "to mov",
    COLORS.RED,
    [video_t],
    [mov_t],
    vid_to_mov,
    EditorNodeVariant.PROCESS
)

export const vidtom4a: EditorNodeType = new EditorNodeType(
    "to m4a",
    COLORS.RED,
    [video_t],
    [m4a_t],
    vid_to_m4a,
    EditorNodeVariant.PROCESS
)