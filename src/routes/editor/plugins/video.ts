import { COLORS } from "../../common/colors"
import { EditorNodeType, EditorNodeVariant, IOType } from "../EditorNode"

export const video_t: IOType = new IOType(
    ['video'],
    COLORS.PURPLE
)

export const videoinput: EditorNodeType = new EditorNodeType(
    "upload",
    COLORS.RED,
    [],
    [video_t],
    () => {},
    EditorNodeVariant.UPLOAD
)

export const videooutput: EditorNodeType = new EditorNodeType(
    "download",
    COLORS.RED,
    [video_t],
    [],
    () => {},
    EditorNodeVariant.DOWNLOAD
)