import { sizeCtrlDefaultRaw } from '../../control/variables';
import { ctrlProgressHeightFilledRaw } from '../progress/variables';
import { ctrlSpinnerShowemptytrackRaw, ctrlSpinnerSizeRaw, ctrlSpinnerStrokewidthRaw } from './variables';
export const ctrlSpinnerSize = `var(${ctrlSpinnerSizeRaw}, ${sizeCtrlDefaultRaw})`;
export const ctrlSpinnerStrokewidth = `var(${ctrlSpinnerStrokewidthRaw}, ${ctrlProgressHeightFilledRaw})`;
export const ctrlSpinnerShowemptytrack = `var(${ctrlSpinnerShowemptytrackRaw})`;
