import { backgroundCtrlBrandRestRaw, cornerCircularRaw } from '../../control/variables';
import {
  ctrlProgressBackgroundEmptyRaw,
  ctrlProgressBackgroundFilledRaw,
  ctrlProgressCornerRaw,
  ctrlProgressHeightEmptyRaw,
  ctrlProgressHeightFilledRaw,
  ctrlProgressLgHeightEmptyRaw,
  ctrlProgressLgHeightFilledRaw,
  ctrlProgressSmHeightEmptyRaw,
  ctrlProgressSmHeightFilledRaw,
} from './variables';
export const ctrlProgressBackgroundEmpty = `var(${ctrlProgressBackgroundEmptyRaw})`;
export const ctrlProgressBackgroundFilled = `var(${ctrlProgressBackgroundFilledRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlProgressCorner = `var(${ctrlProgressCornerRaw}, var(${cornerCircularRaw}))`;
export const ctrlProgressHeightFilled = `var(${ctrlProgressHeightFilledRaw})`;
export const ctrlProgressHeightEmpty = `var(${ctrlProgressHeightEmptyRaw}, var(${ctrlProgressHeightFilledRaw}))`;
export const ctrlProgressSmHeightFilled = `var(${ctrlProgressSmHeightFilledRaw})`;
export const ctrlProgressSmHeightEmpty = `var(${ctrlProgressSmHeightEmptyRaw}, var(${ctrlProgressSmHeightFilledRaw}))`;
export const ctrlProgressLgHeightFilled = `var(${ctrlProgressLgHeightFilledRaw})`;
export const ctrlProgressLgHeightEmpty = `var(${ctrlProgressLgHeightEmptyRaw}, var(${ctrlProgressLgHeightFilledRaw}))`;
