import type { ICheckStyleProps, ICheckStyles } from '@fluentui/react';
import { FontWeights, warn } from '@fluentui/react';

export const getCheckStyles = ({ checked, theme }: ICheckStyleProps): Partial<ICheckStyles> => {
  const extendedTheme = theme;

  if (!extendedTheme) {
    warn('Theme is undefined or null.');
  }

  return {
    root: [
      {
        cursor: 'pointer',
        width: '16px',
        height: '16px',
        '::before': {
          transition: 'all ease-in-out 200ms',
          // Because the ::before element is layering on top of CircleRing <i> border, we are increasing the border
          // radius here to 3px, so it doesn’t compete. When both are 2px, the contour might look fuzzy.
          borderRadius: '3px',
          backgroundColor: 'transparent',
          inset: 0,
          height: '100%',
          width: '100%',
        },
      },
      checked && {
        ':hover': {
          '::before': {
            backgroundColor: theme.semanticColors.inputBackgroundCheckedHovered,
          },
          '[data-icon-name="CircleRing"]': {
            borderColor: theme.semanticColors.inputBackgroundCheckedHovered,
          },
        },
        '::before': {
          backgroundColor: theme.semanticColors.inputBackgroundChecked,
        },
        '[data-icon-name="StatusCircleCheckmark"]': {
          opacity: 1,
        },
      },
    ],
    check: [
      {
        fontSize: '18px',
        lineHeight: '16px',
        margin: '0',
        width: '16px',
        height: '16px',
        fontWeight: FontWeights.regular,
        transition: 'opacity ease-in-out 100ms',
        opacity: 0,
        boxSizing: 'border-box',
      },
      checked && {
        color: 'white', // Intended to be white in all themes (dark and light modes)
      },
    ],
    circle: [
      {
        fontSize: 0,
        width: '16px',
        height: '16px',
        borderRadius: 2,
        borderColor: theme.semanticColors.inputBorder,
        borderWidth: '1px',
        borderStyle: 'solid',
        transition: 'all ease-in-out 200ms',
        boxSizing: 'border-box',
      },
      checked && {
        color: theme.semanticColors.bodyTextChecked,
        borderColor: theme.semanticColors.inputBackgroundChecked,
      },
    ],
  };
};
