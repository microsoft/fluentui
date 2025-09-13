// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { iconThemeCtrlDefaultRestRaw, backgroundCtrlBrandRestRaw, sizeCtrlIconRaw } from '../../control/variables';
import { colorNeutralForeground1, colorNeutralBackground6 } from '../../legacy/tokens';
import { ctrlProgressBackgroundEmptyRaw } from '../progress/variables';
import {
  ctrlRatingIconThemeRaw,
  ctrlRatingIconGapRaw,
  ctrlRatingIconForegroundFilledRaw,
  ctrlRatingIconForegroundEmptyRaw,
  ctrlRatingIconSizeRaw,
} from './variables';

export const ctrlRatingIconTheme = `var(${ctrlRatingIconThemeRaw}, var(${iconThemeCtrlDefaultRestRaw}))`;
export const ctrlRatingIconGap = `var(${ctrlRatingIconGapRaw})`;
export const ctrlRatingIconForegroundFilled = `var(${ctrlRatingIconForegroundFilledRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorNeutralForeground1}))`;
export const ctrlRatingIconForegroundEmpty = `var(${ctrlRatingIconForegroundEmptyRaw}, var(${ctrlProgressBackgroundEmptyRaw}, ${colorNeutralBackground6}))`;
export const ctrlRatingIconSize = `var(${ctrlRatingIconSizeRaw}, var(${sizeCtrlIconRaw}))`;
