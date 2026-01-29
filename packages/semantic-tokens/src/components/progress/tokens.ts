// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { backgroundCtrlBrandRestRaw, cornerCircularRaw } from '../../control/variables';
import { colorNeutralBackground6, colorCompoundBrandBackground, borderRadiusMedium } from '../../legacy/tokens';
import {
  ctrlProgressBackgroundEmptyRaw,
  ctrlProgressBackgroundFilledRaw,
  ctrlProgressCornerRaw,
  ctrlProgressHeightFilledRaw,
  ctrlProgressHeightEmptyRaw,
  ctrlProgressSmHeightFilledRaw,
  ctrlProgressSmHeightEmptyRaw,
  ctrlProgressLgHeightFilledRaw,
  ctrlProgressLgHeightEmptyRaw,
} from './variables';

export const ctrlProgressBackgroundEmpty = `var(${ctrlProgressBackgroundEmptyRaw}, ${colorNeutralBackground6})`;
export const ctrlProgressBackgroundFilled = `var(${ctrlProgressBackgroundFilledRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorCompoundBrandBackground}))`;
export const ctrlProgressCorner = `var(${ctrlProgressCornerRaw}, var(${cornerCircularRaw}, ${borderRadiusMedium}))`;
export const ctrlProgressHeightFilled = `var(${ctrlProgressHeightFilledRaw}, 100%)`;
export const ctrlProgressHeightEmpty = `var(${ctrlProgressHeightEmptyRaw}, var(${ctrlProgressHeightFilledRaw}, 2px))`;
export const ctrlProgressSmHeightFilled = `var(${ctrlProgressSmHeightFilledRaw})`;
export const ctrlProgressSmHeightEmpty = `var(${ctrlProgressSmHeightEmptyRaw}, var(${ctrlProgressSmHeightFilledRaw}))`;
export const ctrlProgressLgHeightFilled = `var(${ctrlProgressLgHeightFilledRaw}, 100%)`;
export const ctrlProgressLgHeightEmpty = `var(${ctrlProgressLgHeightEmptyRaw}, var(${ctrlProgressLgHeightFilledRaw}, 4px))`;
