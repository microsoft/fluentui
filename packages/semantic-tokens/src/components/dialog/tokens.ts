// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { nullColorRaw, cornerCardRestRaw, backgroundLayerPrimarySolidRaw } from '../../control/variables';
import { colorNeutralStroke2, borderRadiusXLarge, colorNeutralBackground1 } from '../../legacy/tokens';
import {
  ctrlDialogBackgroundRaw,
  ctrlDialogStrokeRaw,
  ctrlDialogBaseCornerRaw,
  ctrlDialogLayerBackgroundRaw,
  ctrlDialogLayerPaddingBottomRaw,
  ctrlDialogBaseShadowKeyRaw,
  ctrlDialogBaseShadowAmbientRaw,
} from './variables';

export const ctrlDialogBackground = `var(${ctrlDialogBackgroundRaw})`;
export const ctrlDialogStroke = `var(${ctrlDialogStrokeRaw}, var(${nullColorRaw}, ${colorNeutralStroke2}))`;
export const ctrlDialogBaseCorner = `var(${ctrlDialogBaseCornerRaw}, var(${cornerCardRestRaw}, ${borderRadiusXLarge}))`;
export const ctrlDialogLayerBackground = `var(${ctrlDialogLayerBackgroundRaw}, var(${backgroundLayerPrimarySolidRaw}, ${colorNeutralBackground1}))`;
export const ctrlDialogLayerPaddingBottom = `var(${ctrlDialogLayerPaddingBottomRaw})`;
export const ctrlDialogBaseShadowKey = `var(${ctrlDialogBaseShadowKeyRaw}, rgba(0, 0, 0, 0.12) 0px 0px 8px 0px)`;
export const ctrlDialogBaseShadowAmbient = `var(${ctrlDialogBaseShadowAmbientRaw}, rgba(0, 0, 0, 0.14) 0px 32px 64px 0px)`;
