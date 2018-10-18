import { ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMinMedium, getScreenSelector } from 'office-ui-fabric-react/lib/Styling';

export const fluentBorderRadius = '2px';
export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
