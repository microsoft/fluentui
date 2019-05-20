import { ScreenWidthMaxMedium, ScreenWidthMaxSmall, ScreenWidthMinMedium, getScreenSelector } from 'office-ui-fabric-react';

export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
