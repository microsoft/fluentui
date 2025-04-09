import { backgroundLayerPrimarySolidRaw, cornerCardRestRaw } from '../../control/variables';
import {
  ctrlDialogBackgroundRaw,
  ctrlDialogBaseCornerRaw,
  ctrlDialogBaseShadowAmbientRaw,
  ctrlDialogBaseShadowKeyRaw,
  ctrlDialogLayerBackgroundRaw,
  ctrlDialogLayerPaddingBottomRaw,
  ctrlDialogStrokeRaw,
} from './variables';

export const ctrlDialogBackground = `var(${ctrlDialogBackgroundRaw})`;
export const ctrlDialogStroke = `var(${ctrlDialogStrokeRaw}, unset)`;
export const ctrlDialogBaseCorner = `var(${ctrlDialogBaseCornerRaw}, var(${cornerCardRestRaw}))`;
export const ctrlDialogLayerBackground = `var(${ctrlDialogLayerBackgroundRaw}, var(${backgroundLayerPrimarySolidRaw}))`;
export const ctrlDialogLayerPaddingBottom = `var(${ctrlDialogLayerPaddingBottomRaw})`;
export const ctrlDialogBaseShadowKey = `var(${ctrlDialogBaseShadowKeyRaw})`;
export const ctrlDialogBaseShadowAmbient = `var(${ctrlDialogBaseShadowAmbientRaw})`;
