import {
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium,
  getScreenSelector,
} from '@fluentui/react/lib/Styling';

export const inputHeight = '18px';
export const borderWidth = '1px';
export const borderRadius = '3px';
export const borderWidthError = '1px';
export const borderSolid = 'solid';
export const borderNone = 'none';
export const dropDownItemHeight = '32px';
export const fontFamily =
  // eslint-disable-next-line @fluentui/max-len
  'Segoe UI, "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue",sans-serif';
export const fontWeightRegular = '400';
export const fontWeightBold = '700';
export const inputControlHeight = '24px';
export const choiceGroupDimensions = '18px';
export const inputControlPadding = '12px';
export const inputControlHeightInner = '20px';
export const textAlignCenter = 'center';
export const transparent = 'transparent';
export const MinimumScreenSelector = getScreenSelector(0, ScreenWidthMaxSmall);
export const MediumScreenSelector = getScreenSelector(ScreenWidthMinMedium, ScreenWidthMaxMedium);
