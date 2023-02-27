import { GriffelStyle, shorthands } from '@fluentui/react-components';
import { iconClassNames } from '@fluentui/react-northstar';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';

export const v9HoverClasses = (): GriffelStyle => ({
  [`& .${iconFilledClassName}`]: {
    display: 'none',
  },
  [`& .${iconRegularClassName}`]: {
    display: 'inline',
  },
  '&:hover': {
    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
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
  [`& .${iconClassNames.outline}`]: {
    display: 'block',
  },
  [`& .${iconClassNames.filled}`]: {
    display: 'none',
  },
  '&:hover': {
    [`& .${iconClassNames.outline}`]: {
      display: 'none',
    },
    [`& .${iconClassNames.filled}`]: {
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
