import { ctrlProgressHeightFilledRaw } from '../progress/variables';
import { ctrlSpinnerStrokewidthRaw, ctrlSpinnerShowemptytrackRaw } from './variables';

export const ctrlSpinnerStrokewidth = `var(${ctrlSpinnerStrokewidthRaw}, var(${ctrlProgressHeightFilledRaw}))`;
export const ctrlSpinnerShowemptytrack = `var(${ctrlSpinnerShowemptytrackRaw})`;
