import { ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMinMedium, getScreenSelector } from '@uifabric/styling';

export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
