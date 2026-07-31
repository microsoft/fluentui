/* eslint-disable @typescript-eslint/no-deprecated */

'use client';

// Griffel → Tailwind + CSS Modules migration (S-G): `createFocusOutlineStyle` was deleted
// from @fluentui/react-tabster. Its default output is inlined below, verbatim — this
// deprecated package intentionally stays on Griffel.
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated use {@link @fluentui/react-components#InfoLabel} from `\@fluentui/react-components` or `\@fluentui/react-infolabel` instead
 */
export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  root: 'fui-InfoButton',
  // this className won't be used, but it's needed to satisfy the type checker
  popover: 'fui-InfoButton__popover',
  info: 'fui-InfoButton__info',
};

/**
 * Styles for the root slot
 *
 * @deprecated use {@link @fluentui/react-components#InfoLabel} from `\@fluentui/react-components` or `\@fluentui/react-infolabel` instead
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

    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground2,

    ...shorthands.borderStyle('none'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.margin(0),
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
      cursor: 'pointer',

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },

  selected: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    color: tokens.colorNeutralForeground2BrandSelected,

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

  // Inlined `createFocusOutlineStyle()` default output.
  focusIndicator: {
    ':focus': {
      outlineStyle: 'none',
    },
    ':focus-visible': {
      outlineStyle: 'none',
    },
    '&[data-fui-focus-visible]': {
      ...shorthands.borderColor('transparent'),
      '@media (forced-colors: active)': {
        '::after': {
          ...shorthands.borderColor('Highlight'),
        },
      },
      '::after': {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 1,

        border: `2px solid ${tokens.colorStrokeFocus2}`,
        borderRadius: tokens.borderRadiusMedium,

        top: 'calc(2px * -1)',
        right: 'calc(2px * -1)',
        bottom: 'calc(2px * -1)',
        left: 'calc(2px * -1)',
      },
    },
  },

  large: {
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingVerticalXXS),
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

  // eslint-disable-next-line react-hooks/immutability -- deprecated component, not worth refactoring
  state.info.className = mergeClasses(
    infoButtonClassNames.info,
    size === 'large' ? popoverSurfaceStyles.large : popoverSurfaceStyles.smallMedium,
    state.info.className,
  );

  // eslint-disable-next-line react-hooks/immutability -- deprecated component, not worth refactoring
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
