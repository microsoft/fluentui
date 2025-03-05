// eslint-disable-next-line no-restricted-imports
import { backgroundLayerPrimarySolidRaw, cornerCardRestRaw, nullColorRaw } from "../../control/variables";
import { ctrlDialogBackgroundRaw, ctrlDialogBaseCornerRaw, ctrlDialogBaseShadowAmbientBlurRaw, ctrlDialogBaseShadowAmbientColorRaw, ctrlDialogBaseShadowAmbientXRaw, ctrlDialogBaseShadowAmbientYRaw, ctrlDialogBaseShadowKeyBlurRaw, ctrlDialogBaseShadowKeyColorRaw, ctrlDialogBaseShadowKeyXRaw, ctrlDialogBaseShadowKeyYRaw, ctrlDialogLayerBackgroundRaw, ctrlDialogLayerPaddingBottomRaw, ctrlDialogStrokeRaw } from "./variables";

export const ctrlDialogBackground = `var(${ctrlDialogBackgroundRaw})`;
export const ctrlDialogStroke = `var(${ctrlDialogStrokeRaw}, ${nullColorRaw})`;
export const ctrlDialogBaseCorner = `var(${ctrlDialogBaseCornerRaw}, ${cornerCardRestRaw})`;
export const ctrlDialogBaseShadowKeyX = `var(${ctrlDialogBaseShadowKeyXRaw})`;
export const ctrlDialogBaseShadowKeyY = `var(${ctrlDialogBaseShadowKeyYRaw})`;
export const ctrlDialogBaseShadowKeyBlur = `var(${ctrlDialogBaseShadowKeyBlurRaw})`;
export const ctrlDialogBaseShadowKeyColor = `var(${ctrlDialogBaseShadowKeyColorRaw})`;
export const ctrlDialogBaseShadowAmbientX = `var(${ctrlDialogBaseShadowAmbientXRaw})`;
export const ctrlDialogBaseShadowAmbientY = `var(${ctrlDialogBaseShadowAmbientYRaw})`;
export const ctrlDialogBaseShadowAmbientBlur = `var(${ctrlDialogBaseShadowAmbientBlurRaw})`;
export const ctrlDialogBaseShadowAmbientColor = `var(${ctrlDialogBaseShadowAmbientColorRaw})`;
export const ctrlDialogLayerBackground = `var(${ctrlDialogLayerBackgroundRaw}, ${backgroundLayerPrimarySolidRaw})`;
export const ctrlDialogLayerPaddingBottom = `var(${ctrlDialogLayerPaddingBottomRaw})`;
