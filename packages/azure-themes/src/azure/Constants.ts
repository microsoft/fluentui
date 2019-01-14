import { ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMinMedium, getScreenSelector } from 'office-ui-fabric-react/lib/Styling';

export const borderWidth = '1px';
export const borderWidthError = '2px';
export const borderSolid = 'solid';
export const borderNone = 'none';
export const inputControlHeight = '25px';
export const textAlignCenter = 'center';
export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
