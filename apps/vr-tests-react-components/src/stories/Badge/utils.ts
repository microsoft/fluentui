import { BadgeProps } from '@fluentui/react-badge';
import { makeStyles } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';

type ValueArrays<T> = {
  [K in keyof T]: T[K][];
};

export const propValues: ValueArrays<Pick<Required<BadgeProps>, 'size' | 'color' | 'appearance' | 'shape'>> = {
  size: ['tiny', 'extra-small', 'small', 'medium', 'large', 'extra-large'],
  color: ['brand', 'danger', 'severe', 'warning', 'success', 'important', 'informative', 'subtle'],
  appearance: ['filled', 'outline', 'tint', 'ghost'],
  shape: ['circular', 'rounded', 'square'],
};

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  badgeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '5px',
  },

  label: {
    marginLeft: '10px',
  },

  brandContainer: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
  },

  groupSet: {
    display: 'inline-flex',
    flexDirection: 'column',
    padding: `0 ${tokens.spacingHorizontalL}`,
    rowGap: tokens.spacingVerticalL,
  },

  group: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'start',
    rowGap: tokens.spacingVerticalS,
  },

  groupLabel: {
    ...typographyStyles.subtitle2Stronger,
  },

  row: {
    display: 'inline-flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS,
  },

  widthConstrained: {
    display: 'inline-flex',
    width: '150px',
    columnGap: tokens.spacingHorizontalS,
    padding: '1px',
    border: `2px dashed ${tokens.colorPaletteRedBorder1}`,
    backgroundColor: tokens.colorPaletteRedBackground1,
  },

  description: {
    color: tokens.colorNeutralForeground3,
    ...typographyStyles.caption1,
  },
});
