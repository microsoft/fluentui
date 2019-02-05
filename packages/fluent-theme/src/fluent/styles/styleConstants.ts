import { ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMinMedium, getScreenSelector } from '@uifabric/styling';

export const fluentBorderRadius = '2px';
export const detailsRowCheckWidth = 48;
export const groupHeaderCheckWidth = detailsRowCheckWidth;
export const groupIndentSpacerWidth = 36;

export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
