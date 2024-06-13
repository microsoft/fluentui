import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  root: 'fui-InfoButton',
  // this className won't be used, but it's needed to satisfy the type checker
  popover: 'fui-InfoButton__popover',
  info: 'fui-InfoButton__info',
};

/**
 * Styles for the root slot
 */
const useButtonStyles = makeStyles({
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',

    backgroundColor: `var(--ctrl-token-InfoButton-1143, var(--semantic-token-InfoButton-1144, ${tokens.colorTransparentBackground}))`,
    color: `var(--ctrl-token-InfoButton-1145, var(--semantic-token-InfoButton-1146, ${tokens.colorNeutralForeground2}))`,

    ...shorthands.borderStyle('none'),
    borderRadius: `var(--ctrl-token-InfoButton-1147, var(--semantic-token-InfoButton-1148, ${tokens.borderRadiusMedium}))`,
    margin: '0',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,

    [`& .${iconFilledClassName}`]: {
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'inline-flex',
    },

    ':hover': {
      backgroundColor: `var(--ctrl-token-InfoButton-1149, var(--semantic-token-InfoButton-1150, ${tokens.colorTransparentBackgroundHover}))`,
      color: `var(--ctrl-token-InfoButton-1151, var(--semantic-token-InfoButton-1152, ${tokens.colorNeutralForeground2BrandHover}))`,
      cursor: 'pointer',

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':hover:active': {
      backgroundColor: `var(--ctrl-token-InfoButton-1153, var(--semantic-token-InfoButton-1154, ${tokens.colorTransparentBackgroundPressed}))`,
      color: `var(--ctrl-token-InfoButton-1155, var(--semantic-token-InfoButton-1156, ${tokens.colorNeutralForeground2BrandPressed}))`,
    },
  },

  selected: {
    backgroundColor: `var(--ctrl-token-InfoButton-1157, var(--semantic-token-InfoButton-1158, ${tokens.colorTransparentBackgroundSelected}))`,
    color: `var(--ctrl-token-InfoButton-1159, var(--semantic-token-InfoButton-1160, ${tokens.colorNeutralForeground2BrandSelected}))`,

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

  highContrast: {
    '@media (forced-colors: active)': {
      color: 'CanvasText',

      ':hover,:hover:active': {
        forcedColorAdjust: 'none',
        backgroundColor: 'Highlight',
        color: 'Canvas',
      },
    },
  },

  focusIndicator: createFocusOutlineStyle(),

  large: {
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingVerticalXXS}`,
  },
});

const usePopoverSurfaceStyles = makeStyles({
  smallMedium: typographyStyles.caption1,
  large: typographyStyles.body1,
});

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { size } = state;
  const { open } = state.popover;
  const buttonStyles = useButtonStyles();
  const popoverSurfaceStyles = usePopoverSurfaceStyles();

  state.info.className = mergeClasses(
    infoButtonClassNames.info,
    size === 'large' ? popoverSurfaceStyles.large : popoverSurfaceStyles.smallMedium,
    state.info.className,
  );

  state.root.className = mergeClasses(
    infoButtonClassNames.root,
    buttonStyles.base,
    buttonStyles.highContrast,
    buttonStyles.focusIndicator,
    open && buttonStyles.selected,
    size === 'large' && buttonStyles.large,
    state.root.className,
  );

  return state;
};
