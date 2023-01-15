import { COLORS } from "src/routes/common/colors";
import { EditorNodeType, EditorNodeVariant } from "../EditorNode";

export const fileUpload: EditorNodeType = new EditorNodeType(
    "upload",
    COLORS.RED,
    [],
    [{typenames: ["file"], color: COLORS.WHITE}],
    () => {},
    EditorNodeVariant.UPLOAD
)