import { ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMinMedium, getScreenSelector } from 'office-ui-fabric-react/lib/Styling';

export const borderWidthError = '2px';
export const inputControlHeight = '25px';
export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
