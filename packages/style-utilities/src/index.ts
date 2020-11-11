export * from './classNames/index';
export * from './styles/index';
export * from './utilities/index';
export * from './interfaces/index';
export * from './MergeStyles';

import { IIconRecordXX, IIconSubsetXX, IIconSubsetRecordXX, IIconOptionsXX } from './utilities/index';

export type IIconRecord = IIconRecordXX;
export type IIconSubset = IIconSubsetXX;
export type IIconSubsetRecord = IIconSubsetRecordXX;
export type IIconOptions = IIconOptionsXX;

import { GlobalClassNamesXX } from './styles/index';
export type GlobalClassNames<IStyles> = GlobalClassNamesXX<IStyles>;

import './version';

// Ensure theme is initialized when this package is referenced.
import { initializeThemeInCustomizations } from './styles/theme';
initializeThemeInCustomizations();
