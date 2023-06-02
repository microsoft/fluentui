import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { InfoTipSlots, InfoTipState } from './InfoTip.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoTipClassNames: SlotClassNames<InfoTipSlots> = {
  root: 'fui-InfoTip',
  // this className won't be used, but it's needed to satisfy the type checker
  tooltip: 'fui-InfoTip__tooltip',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  base: {
    display: 'inline-flex',
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),

    [`& .${iconFilledClassName}`]: {
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'inline-flex',
    },

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      color: tokens.colorNeutralForeground2BrandHover,

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },

  open: {
    backgroundColor: tokens.colorTransparentBackgroundHover,
    color: tokens.colorNeutralForeground2BrandHover,

    [`& .${iconFilledClassName}`]: {
      display: 'inline-flex',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'Canvas',
    },
  },

  large: {
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingVerticalXXS),
  },

  highContrast: {
    '@media (forced-colors: active)': {
      color: 'CanvasText',

      ':hover': {
        forcedColorAdjust: 'none',
        backgroundColor: 'Highlight',
        color: 'Canvas',
      },
    },
  },
});

/**
 * Apply styling to the InfoTip slots based on the state
 */
export const useInfoTipStyles_unstable = (state: InfoTipState): InfoTipState => {
  const { open, size } = state;
  const styles = useStyles();

  state.root.className = mergeClasses(
    infoTipClassNames.root,
    styles.base,
    styles.highContrast,
    open && styles.open,
    size === 'large' && styles.large,
    state.root.className,
  );

  return state;
};
