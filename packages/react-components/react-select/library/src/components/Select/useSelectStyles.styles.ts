import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';

export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
};

const iconSizes = {
  small: '16px',
  medium: '20px',
  large: '24px',
};

//TODO: Should fieldHeights be a set of global design tokens or constants?
const fieldHeights = {
  small: '24px',
  medium: '32px',
  large: '40px',
};

/* Since the <select> element must span the full width and cannot have children,
 * the right padding needs to be calculated from the sum of the following:
 * 1. Field padding-right
 * 2. Icon width
 * 3. Content-icon spacing
 * 4. Content inner padding
 */
const paddingRight = {
  small: `calc(${tokens.spacingHorizontalSNudge}
    + ${iconSizes.small}
    + ${tokens.spacingHorizontalXXS}
    + ${tokens.spacingHorizontalXXS})`,
  medium: `calc(${tokens.spacingHorizontalMNudge}
    + ${iconSizes.medium}
    + ${tokens.spacingHorizontalXXS}
    + ${tokens.spacingHorizontalXXS})`,
  large: `calc(${tokens.spacingHorizontalM}
    + ${iconSizes.large}
    + ${tokens.spacingHorizontalSNudge}
    + ${tokens.spacingHorizontalSNudge})`,
};

/* Left padding is calculated from the outer padding + inner content padding values
 * since <select> can't have additional child content or custom inner layout */
const paddingLeft = {
  small: `calc(${tokens.spacingHorizontalSNudge} + ${tokens.spacingHorizontalXXS})`,
  medium: `calc(${tokens.spacingHorizontalMNudge} + ${tokens.spacingHorizontalXXS})`,
  large: `calc(${tokens.spacingHorizontalM} + ${tokens.spacingHorizontalSNudge})`,
};

/* end of shared values */

const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexWrap: 'nowrap',
    fontFamily: `var(--ctrl-token-Select-1601, var(--semantic-token-Select-1602, ${tokens.fontFamilyBase}))`,
    position: 'relative',

    '&::after': {
      backgroundImage: `linear-gradient(
        0deg,
        ${tokens.colorCompoundBrandStroke} 0%,
        ${tokens.colorCompoundBrandStroke} 50%,
        transparent 50%,
        transparent 100%
      )`,
      borderRadius: `0 0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium}`,
      boxSizing: 'border-box',
      content: '""',
      height: `var(--ctrl-token-Select-1603, var(--semantic-token-Select-1604, ${tokens.borderRadiusMedium}))`,
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      transform: 'scaleX(0)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Select-1605, var(--semantic-token-Select-1606, ${tokens.durationUltraFast}))`,
      transitionDelay: `var(--ctrl-token-Select-1607, var(--semantic-token-Select-1608, ${tokens.curveAccelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },

    '&:focus-within::after': {
      transform: 'scaleX(1)',
      transitionProperty: 'transform',
      transitionDuration: `var(--ctrl-token-Select-1609, var(--semantic-token-Select-1610, ${tokens.durationNormal}))`,
      transitionDelay: `var(--ctrl-token-Select-1611, var(--semantic-token-Select-1612, ${tokens.curveDecelerateMid}))`,

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
        transitionDelay: '0.01ms',
      },
    },
  },
});

const useSelectStyles = makeStyles({
  base: {
    appearance: 'none',
    border: '1px solid transparent',
    borderRadius: `var(--ctrl-token-Select-1613, var(--semantic-token-Select-1614, ${tokens.borderRadiusMedium}))`,
    boxShadow: 'none',
    boxSizing: 'border-box',
    color: `var(--ctrl-token-Select-1615, var(--semantic-token-Select-1616, ${tokens.colorNeutralForeground1}))`,
    cursor: 'pointer',
    flexGrow: 1,
    maxWidth: '100%',
    paddingBottom: 0,
    paddingTop: 0,

    ':focus': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
  },
  disabled: {
    backgroundColor: `var(--ctrl-token-Select-1617, var(--semantic-token-Select-1618, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: `var(--ctrl-token-Select-1619, var(--semantic-token-Select-1620, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
    },
  },
  disabledUnderline: {
    ...shorthands.borderColor(
      tokens.colorTransparentStrokeDisabled,
      tokens.colorTransparentStrokeDisabled,
      tokens.colorNeutralStrokeDisabled,
    ),
  },

  small: {
    height: fieldHeights.small,
    paddingLeft: paddingLeft.small,
    paddingRight: paddingRight.small,
    ...typographyStyles.caption1,
  },
  medium: {
    height: fieldHeights.medium,
    paddingLeft: paddingLeft.medium,
    paddingRight: paddingRight.medium,
    ...typographyStyles.body1,
  },
  large: {
    height: fieldHeights.large,
    paddingLeft: paddingLeft.large,
    paddingRight: paddingRight.large,
    ...typographyStyles.body2,
  },
  outline: {
    backgroundColor: `var(--ctrl-token-Select-1621, var(--semantic-token-Select-1622, ${tokens.colorNeutralBackground1}))`,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-Select-1623, var(--semantic-token-Select-1624, ${tokens.colorNeutralStrokeAccessible}))`,
  },
  outlineInteractive: {
    '&:hover': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-Select-1625, var(--semantic-token-Select-1626, ${tokens.colorNeutralStrokeAccessible}))`,
    },

    '&:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      borderBottomColor: `var(--ctrl-token-Select-1627, var(--semantic-token-Select-1628, ${tokens.colorNeutralStrokeAccessible}))`,
    },
  },
  underline: {
    backgroundColor: `var(--ctrl-token-Select-1629, var(--semantic-token-Select-1630, ${tokens.colorTransparentBackground}))`,
    borderBottom: `1px solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: '0',
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-Select-1631, var(--semantic-token-Select-1632, ${tokens.colorNeutralBackground1}))`,
  },
  'filled-darker': {
    backgroundColor: `var(--ctrl-token-Select-1633, var(--semantic-token-Select-1634, ${tokens.colorNeutralBackground3}))`,
  },
  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  invalidUnderline: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      borderBottomColor: `var(--ctrl-token-Select-1635, var(--semantic-token-Select-1636, ${tokens.colorPaletteRedBorder2}))`,
    },
  },
});

const useIconStyles = makeStyles({
  icon: {
    boxSizing: 'border-box',
    color: `var(--ctrl-token-Select-1637, var(--semantic-token-Select-1638, ${tokens.colorNeutralStrokeAccessible}))`,
    display: 'block',
    position: 'absolute',
    pointerEvents: 'none',

    // the SVG must have display: block for accurate positioning
    // otherwise an extra inline space is inserted after the svg element
    '& svg': {
      display: 'block',
    },
  },
  disabled: {
    color: `var(--ctrl-token-Select-1639, var(--semantic-token-Select-1640, ${tokens.colorNeutralForegroundDisabled}))`,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
  small: {
    fontSize: iconSizes.small,
    height: iconSizes.small,
    right: `var(--ctrl-token-Select-1641, var(--semantic-token-Select-1642, ${tokens.spacingHorizontalSNudge}))`,
    width: iconSizes.small,
  },
  medium: {
    fontSize: iconSizes.medium,
    height: iconSizes.medium,
    right: `var(--ctrl-token-Select-1643, var(--semantic-token-Select-1644, ${tokens.spacingHorizontalMNudge}))`,
    width: iconSizes.medium,
  },
  large: {
    fontSize: iconSizes.large,
    height: iconSizes.large,
    right: `var(--ctrl-token-Select-1645, var(--semantic-token-Select-1646, ${tokens.spacingHorizontalM}))`,
    width: iconSizes.large,
  },
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  const { size, appearance } = state;
  const disabled = state.select.disabled;
  const invalid = `${state.select['aria-invalid']}` === 'true';

  const iconStyles = useIconStyles();
  const rootStyles = useRootStyles();
  const selectStyles = useSelectStyles();

  state.root.className = mergeClasses(selectClassNames.root, rootStyles.base, state.root.className);

  state.select.className = mergeClasses(
    selectClassNames.select,
    selectStyles.base,
    selectStyles[size],
    selectStyles[appearance],
    !disabled && appearance === 'outline' && selectStyles.outlineInteractive,
    !disabled && invalid && appearance !== 'underline' && selectStyles.invalid,
    !disabled && invalid && appearance === 'underline' && selectStyles.invalidUnderline,
    disabled && selectStyles.disabled,
    disabled && appearance === 'underline' && selectStyles.disabledUnderline,
    state.select.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      selectClassNames.icon,
      iconStyles.icon,
      disabled && iconStyles.disabled,
      iconStyles[size],
      state.icon.className,
    );
  }

  return state;
};
