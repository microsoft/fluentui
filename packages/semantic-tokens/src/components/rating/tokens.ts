// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { backgroundCtrlBrandRestRaw, sizeCtrlIconRaw } from '../../control/variables';
import { ctrlProgressBackgroundEmptyRaw } from '../progress/variables';
import {
  ctrlRatingIconThemeRaw,
  ctrlRatingIconGapRaw,
  ctrlRatingIconForegroundFilledRaw,
  ctrlRatingIconForegroundEmptyRaw,
  ctrlRatingIconSizeRaw,
} from './variables';

export const ctrlRatingIconTheme = `var(${ctrlRatingIconThemeRaw}, var(${iconthemeCtrlDefaultRestRaw}))`;
export const ctrlRatingIconGap = `var(${ctrlRatingIconGapRaw})`;
export const ctrlRatingIconForegroundFilled = `var(${ctrlRatingIconForegroundFilledRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlRatingIconForegroundEmpty = `var(${ctrlRatingIconForegroundEmptyRaw}, var(${ctrlProgressBackgroundEmptyRaw}))`;
export const ctrlRatingIconSize = `var(${ctrlRatingIconSizeRaw}, var(${sizeCtrlIconRaw}))`;
