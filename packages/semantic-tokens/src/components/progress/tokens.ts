// eslint-disable-next-line no-restricted-imports
import { backgroundCtrlBrandRestRaw, cornerCircularRaw } from "../../control/variables";
import { ctrlProgressBackgroundEmptyRaw, ctrlProgressBackgroundFilledRaw, ctrlProgressCornerRaw, ctrlProgressHeightEmptyRaw, ctrlProgressHeightFilledRaw, ctrlProgressLgHeightEmptyRaw, ctrlProgressLgHeightFilledRaw, ctrlProgressSmHeightEmptyRaw, ctrlProgressSmHeightFilledRaw } from "./variables";

export const ctrlProgressBackgroundEmpty = `var(${ctrlProgressBackgroundEmptyRaw})`;
export const ctrlProgressBackgroundFilled = `var(${ctrlProgressBackgroundFilledRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlProgressCorner = `var(${ctrlProgressCornerRaw}, ${cornerCircularRaw})`;
export const ctrlProgressHeightFilled = `var(${ctrlProgressHeightFilledRaw})`;
export const ctrlProgressHeightEmpty = `var(${ctrlProgressHeightEmptyRaw}, ${ctrlProgressHeightFilledRaw})`;
export const ctrlProgressSmHeightFilled = `var(${ctrlProgressSmHeightFilledRaw})`;
export const ctrlProgressSmHeightEmpty = `var(${ctrlProgressSmHeightEmptyRaw}, ${ctrlProgressSmHeightFilledRaw})`;
export const ctrlProgressLgHeightFilled = `var(${ctrlProgressLgHeightFilledRaw})`;
export const ctrlProgressLgHeightEmpty = `var(${ctrlProgressLgHeightEmptyRaw}, ${ctrlProgressLgHeightFilledRaw})`;
