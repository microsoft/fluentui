// eslint-disable-next-line no-restricted-imports
import { backgroundCtrlBrandRestRaw, foregroundCtrlOnbrandRestRaw, strokewidthDefaultRaw } from "../../control/variables";
import { strokeCtrlOnbrandRestRaw } from "../../nullable/variables";
import { ctrlLitefilterBackgroundSelectedRaw, ctrlLitefilterForegroundSelectedRaw, ctrlLitefilterStrokeSelectedRaw, ctrlLitefilterStrokewidthSelectedRaw } from "./variables";

export const ctrlLitefilterBackgroundSelected = `var(${ctrlLitefilterBackgroundSelectedRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlLitefilterStrokeSelected = `var(${ctrlLitefilterStrokeSelectedRaw}, var(${strokeCtrlOnbrandRestRaw}, ${strokeCtrlOnbrandRestRaw}))`;
export const ctrlLitefilterForegroundSelected = `var(${ctrlLitefilterForegroundSelectedRaw}, ${foregroundCtrlOnbrandRestRaw})`;
export const ctrlLitefilterStrokewidthSelected = `var(${ctrlLitefilterStrokewidthSelectedRaw}, ${strokewidthDefaultRaw})`;
