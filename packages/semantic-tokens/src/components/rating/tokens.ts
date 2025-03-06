import { backgroundCtrlBrandRestRaw, iconthemeCtrlDefaultRestRaw, sizeCtrlIconRaw } from '../../control/variables';
import { ctrlProgressBackgroundEmptyRaw } from '../progress/variables';
import {
  ctrlRatingIconForegroundEmptyRaw,
  ctrlRatingIconForegroundFilledRaw,
  ctrlRatingIconGapRaw,
  ctrlRatingIconSizeRaw,
  ctrlRatingIconThemeRaw,
} from './variables';
export const ctrlRatingIconTheme = `var(${ctrlRatingIconThemeRaw}, ${iconthemeCtrlDefaultRestRaw})`;
export const ctrlRatingIconGap = `var(${ctrlRatingIconGapRaw})`;
export const ctrlRatingIconForegroundFilled = `var(${ctrlRatingIconForegroundFilledRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlRatingIconForegroundEmpty = `var(${ctrlRatingIconForegroundEmptyRaw}, ${ctrlProgressBackgroundEmptyRaw})`;
export const ctrlRatingIconSize = `var(${ctrlRatingIconSizeRaw}, ${sizeCtrlIconRaw})`;
