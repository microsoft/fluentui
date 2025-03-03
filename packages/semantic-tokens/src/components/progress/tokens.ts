// eslint-disable-next-line no-restricted-imports
import { tokens } from '@fluentui/tokens';

export const ctrlProgressBackgroundEmpty = `var(${ctrlProgressBackgroundEmptyRaw}, ${tokens.colorNeutralBackground6})`;
export const ctrlProgressBackgroundFilled = `var(${ctrlProgressBackgroundFilledRaw}, var(var(${backgroundCtrlBrandRestRaw}, ${brandBackground1RestRaw}), var(${backgroundCtrlActivebrandRestRaw}, var(${backgroundCtrlBrandRestRaw}, ${brandBackground1RestRaw}))))`;
export const ctrlProgressCorner = `var(${ctrlProgressCornerRaw}, var(${cornerCircularRaw}, ${circularRaw}))`;
export const ctrlProgressHeightFilled = `var(${ctrlProgressHeightFilledRaw}, ${thickRaw})`;
export const ctrlProgressHeightEmpty = `var(${ctrlProgressHeightEmptyRaw}, var(${ctrlProgressHeightFilledRaw}, ${thickRaw}))`;
export const ctrlProgressSmHeightFilled = `var(${ctrlProgressSmHeightFilledRaw}, ${thickRaw})`;
export const ctrlProgressSmHeightEmpty = `var(${ctrlProgressSmHeightEmptyRaw}, var(${ctrlProgressSmHeightFilledRaw}, ${thickRaw}))`;
export const ctrlProgressLgHeightFilled = `var(${ctrlProgressLgHeightFilledRaw}, ${thickRaw})`;
export const ctrlProgressLgHeightEmpty = `var(${ctrlProgressLgHeightEmptyRaw}, var(${ctrlProgressLgHeightFilledRaw}, ${thickRaw}))`;
