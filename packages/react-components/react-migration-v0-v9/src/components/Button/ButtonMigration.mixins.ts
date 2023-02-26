/* eslint-disable @typescript-eslint/naming-convention */
import { GriffelStyle, shorthands } from '@fluentui/react-components';

export const v9HoverClasses = (): GriffelStyle => ({
  '& .fui-Icon-filled': {
    display: 'none',
  },
  '& .fui-Icon-regular': {
    display: 'inline',
  },
  '&:hover': {
    '& .fui-Icon-filled': {
      display: 'inline',
    },
    '& .fui-Icon-regular': {
      display: 'none',
    },
  },
});

export const v9Icon = (): GriffelStyle => ({
  // styles that allow to keep consistent size of v9 icon with v0 icon
  '& svg': {
    width: '100%',
    paddingBottom: '100%',
    // negative margin is necessary here for centering v9 icon
    // with v0 button, because of extra spaces that svg contains
    ...shorthands.margin('-4px', 0, 0, '-4px'),
    ...shorthands.overflow('visible'),
  },
  ...v9HoverClasses(),
});

export const v9CustomSizeIcon = (): GriffelStyle => ({
  '& svg': {
    ...shorthands.overflow('visible'),
  },
  ...v9HoverClasses(),
});

export const v0Icon = (): GriffelStyle => ({
  '& .ui-icon__outline': {
    display: 'block',
  },
  '& .ui-icon__filled': {
    display: 'none',
  },
  '&:hover': {
    '& .ui-icon__outline': {
      display: 'none',
    },
    '& .ui-icon__filled': {
      display: 'block',
    },
  },
});

export const v9DisabledCursor = (): GriffelStyle => ({
  '&:disabled': {
    cursor: 'default',
    '&:hover': {
      cursor: 'default',
    },
    '&:hover:active': {
      cursor: 'default',
    },
  },
});
