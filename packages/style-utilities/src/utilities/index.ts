export { buildClassMap } from './buildClassMap';

import {
  IIconRecord as IIconRecordXX,
  IIconSubset as IIconSubsetXX,
  IIconSubsetRecord as IIconSubsetRecordXX,
  IIconOptions as IIconOptionsXX,
} from './icons';
export type IIconRecord = IIconRecordXX;
export type IIconSubset = IIconSubsetXX;
export type IIconSubsetRecord = IIconSubsetRecordXX;
export type IIconOptions = IIconOptionsXX;

export { getIcon, registerIcons, registerIconAlias, unregisterIcons, setIconOptions } from './icons';

export { getIconClassName } from './getIconClassName';
