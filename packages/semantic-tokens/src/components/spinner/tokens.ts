import { ctrlProgressHeightFilledRaw } from '../progress/variables';
import { ctrlSpinnerShowemptytrackRaw, ctrlSpinnerStrokewidthRaw } from './variables';
export const ctrlSpinnerStrokewidth = `var(${ctrlSpinnerStrokewidthRaw}, var(${ctrlProgressHeightFilledRaw}))`;
export const ctrlSpinnerShowemptytrack = `var(${ctrlSpinnerShowemptytrackRaw})`;
