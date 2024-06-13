import { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SpinButtonSlots, SpinButtonState } from './SpinButton.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const spinButtonClassNames: SlotClassNames<SpinButtonSlots> = {
  root: 'fui-SpinButton',
  input: 'fui-SpinButton__input',
  incrementButton: 'fui-SpinButton__incrementButton',
  decrementButton: 'fui-SpinButton__decrementButton',
};

const spinButtonExtraClassNames = {
  buttonActive: 'fui-SpinButton__button_active',
};

const fieldHeights = {
  small: '24px',
  medium: '32px',
};

const useRootClassName = makeResetStyles({
  display: 'inline-grid',
  gridTemplateColumns: `1fr 24px`,
  gridTemplateRows: '1fr 1fr',
  columnGap: `var(--ctrl-token-SpinButton-1679, var(--semantic-token-SpinButton-1680, ${tokens.spacingHorizontalXS}))`,
  rowGap: 0,
  position: 'relative',
  isolation: 'isolate',
  verticalAlign: 'middle',

  backgroundColor: `var(--ctrl-token-SpinButton-1681, var(--semantic-token-SpinButton-1682, ${tokens.colorNeutralBackground1}))`,
  minHeight: fieldHeights.medium,
  padding: `0 0 0 ${tokens.spacingHorizontalMNudge}`,
  borderRadius: `var(--ctrl-token-SpinButton-1683, var(--semantic-token-SpinButton-1684, ${tokens.borderRadiusMedium}))`,

  // Apply border styles on the ::before pseudo element.
  // We cannot use ::after since that is used for selection.
  // Using the pseudo element allows us to place the border
  // above content in the component which ensures the buttons
  // line up visually with the border as expected. Without this
  // there is a bit of a gap which can become very noticeable
  // at high zoom or when OS zoom levels are not divisible by 2
  // (e.g., 150% on Windows in Firefox)
  // This is most noticeable on the "outline" appearance which is
  // also the default so it feels worth the extra ceremony to get right.
  '::before': {
    content: '""',
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 10,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottomColor: `var(--ctrl-token-SpinButton-1685, var(--semantic-token-SpinButton-1686, ${tokens.colorNeutralStrokeAccessible}))`,
    borderRadius: `var(--ctrl-token-SpinButton-1687, var(--semantic-token-SpinButton-1688, ${tokens.borderRadiusMedium}))`,
  },

  '::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,

    // Maintaining the correct corner radius:
    // Use the whole border-radius as the height and only put radii on the bottom corners.
    // (Otherwise the radius would be automatically reduced to fit available space.)
    // max() ensures the focus border still shows up even if someone sets tokens.borderRadiusMedium to 0.
    height: `max(2px, ${tokens.borderRadiusMedium})`,
    borderBottomLeftRadius: `var(--ctrl-token-SpinButton-1689, var(--semantic-token-SpinButton-1690, ${tokens.borderRadiusMedium}))`,
    borderBottomRightRadius: `var(--ctrl-token-SpinButton-1691, var(--semantic-token-SpinButton-1692, ${tokens.borderRadiusMedium}))`,

    // Flat 2px border:
    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `2px solid ${tokens.colorCompoundBrandStroke}`,
    clipPath: 'inset(calc(100% - 2px) 0 0 0)',

    // Animation for focus OUT
    transform: 'scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: `var(--ctrl-token-SpinButton-1693, var(--semantic-token-SpinButton-1694, ${tokens.durationUltraFast}))`,
    transitionDelay: `var(--ctrl-token-SpinButton-1695, var(--semantic-token-SpinButton-1696, ${tokens.curveAccelerateMid}))`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },

  ':focus-within::after': {
    // Animation for focus IN
    transform: 'scaleX(1)',
    transitionProperty: 'transform',
    transitionDuration: `var(--ctrl-token-SpinButton-1697, var(--semantic-token-SpinButton-1698, ${tokens.durationNormal}))`,
    transitionDelay: `var(--ctrl-token-SpinButton-1699, var(--semantic-token-SpinButton-1700, ${tokens.curveDecelerateMid}))`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },
  ':focus-within:active::after': {
    // This is if the user clicks the field again while it's already focused
    borderBottomColor: `var(--ctrl-token-SpinButton-1701, var(--semantic-token-SpinButton-1702, ${tokens.colorCompoundBrandStrokePressed}))`,
  },
  ':focus-within': {
    outline: '2px solid transparent',
  },
});

const useRootStyles = makeStyles({
  small: {
    minHeight: fieldHeights.small,
    ...typographyStyles.caption1,
    paddingLeft: `var(--ctrl-token-SpinButton-1703, var(--semantic-token-SpinButton-1704, ${tokens.spacingHorizontalS}))`,
  },

  medium: {
    // set by useRootClassName
  },

  outline: {
    // set by useRootClassName
  },

  outlineInteractive: {
    ':hover::before': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      borderBottomColor: `var(--ctrl-token-SpinButton-1705, var(--semantic-token-SpinButton-1706, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
        borderBottomColor: `var(--ctrl-token-SpinButton-1707, var(--semantic-token-SpinButton-1708, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
      },
    },
  },

  underline: {
    '::before': {
      ...shorthands.borderWidth(0, 0, '1px', 0),
      borderRadius: `var(--ctrl-token-SpinButton-1709, var(--semantic-token-SpinButton-1710, ${tokens.borderRadiusNone}))`, // corners look strange if rounded
    },
  },

  underlineInteractive: {
    ':hover::before': {
      borderBottomColor: `var(--ctrl-token-SpinButton-1711, var(--semantic-token-SpinButton-1712, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        borderBottomColor: `var(--ctrl-token-SpinButton-1713, var(--semantic-token-SpinButton-1714, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
      },
    },
    '::after': {
      borderRadius: `var(--ctrl-token-SpinButton-1715, var(--semantic-token-SpinButton-1716, ${tokens.borderRadiusNone}))`, // remove rounded corners from focus underline
    },
  },

  filled: {
    '::before': {
      border: `1px solid ${tokens.colorTransparentStroke}`,
    },
  },

  'filled-darker': {
    backgroundColor: `var(--ctrl-token-SpinButton-1717, var(--semantic-token-SpinButton-1718, ${tokens.colorNeutralBackground3}))`,
  },
  'filled-lighter': {
    backgroundColor: `var(--ctrl-token-SpinButton-1719, var(--semantic-token-SpinButton-1720, ${tokens.colorNeutralBackground1}))`,
  },

  filledInteractive: {
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':hover,:focus-within': {
      '::before': {
        // also handles pressed border color (:active)
        ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
      },
    },
  },

  invalid: {
    ':not(:focus-within),:hover:not(:focus-within)': {
      '::before': {
        ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
      },
    },
  },

  disabled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-SpinButton-1721, var(--semantic-token-SpinButton-1722, ${tokens.colorTransparentBackground}))`,
    '::before': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

      '@media (forced-colors: active)': {
        ...shorthands.borderColor('GrayText'),
      },
    },
  },
});

const useInputClassName = makeResetStyles({
  gridColumnStart: '1',
  gridColumnEnd: '2',
  gridRowStart: '1',
  gridRowEnd: '3',
  outlineStyle: 'none',
  border: '0',
  padding: '0',
  color: `var(--ctrl-token-SpinButton-1723, var(--semantic-token-SpinButton-1724, ${tokens.colorNeutralForeground1}))`,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  width: '100%',

  '::placeholder': {
    color: `var(--ctrl-token-SpinButton-1725, var(--semantic-token-SpinButton-1726, ${tokens.colorNeutralForeground4}))`,
    opacity: 1, // browser style override
  },
});

const useInputStyles = makeStyles({
  disabled: {
    color: `var(--ctrl-token-SpinButton-1727, var(--semantic-token-SpinButton-1728, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-SpinButton-1729, var(--semantic-token-SpinButton-1730, ${tokens.colorTransparentBackground}))`,
    '::placeholder': {
      color: `var(--ctrl-token-SpinButton-1731, var(--semantic-token-SpinButton-1732, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
});

const useBaseButtonClassName = makeResetStyles({
  display: 'inline-flex',
  width: '24px',
  alignItems: 'center',
  justifyContent: 'center',
  border: '0',
  position: 'absolute',

  outlineStyle: 'none',
  height: '16px',

  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  color: `var(--ctrl-token-SpinButton-1733, var(--semantic-token-SpinButton-1734, ${tokens.colorNeutralForeground3}))`,

  // common button layout
  gridColumnStart: '2',
  borderRadius: '0',
  padding: '0 5px 0 5px',

  ':active': {
    outlineStyle: 'none',
  },

  ':enabled': {
    ':hover': {
      cursor: 'pointer',
      color: `var(--ctrl-token-SpinButton-1735, var(--semantic-token-SpinButton-1736, ${tokens.colorNeutralForeground3Hover}))`,
      backgroundColor: `var(--ctrl-token-SpinButton-1737, var(--semantic-token-SpinButton-1738, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      color: `var(--ctrl-token-SpinButton-1739, var(--semantic-token-SpinButton-1740, ${tokens.colorNeutralForeground3Pressed}))`,
      backgroundColor: `var(--ctrl-token-SpinButton-1741, var(--semantic-token-SpinButton-1742, ${tokens.colorSubtleBackgroundPressed}))`,
    },
    [`&.${spinButtonExtraClassNames.buttonActive}`]: {
      color: `var(--ctrl-token-SpinButton-1743, var(--semantic-token-SpinButton-1744, ${tokens.colorNeutralForeground3Pressed}))`,
      backgroundColor: `var(--ctrl-token-SpinButton-1745, var(--semantic-token-SpinButton-1746, ${tokens.colorSubtleBackgroundPressed}))`,
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
    color: `var(--ctrl-token-SpinButton-1747, var(--semantic-token-SpinButton-1748, ${tokens.colorNeutralForegroundDisabled}))`,
  },
});

const useButtonStyles = makeStyles({
  increment: {
    gridRowStart: '1',
    borderTopRightRadius: `var(--ctrl-token-SpinButton-1749, var(--semantic-token-SpinButton-1750, ${tokens.borderRadiusMedium}))`,
    paddingTop: '4px',
    paddingBottom: '1px',
  },
  decrement: {
    gridRowStart: '2',
    borderBottomRightRadius: `var(--ctrl-token-SpinButton-1751, var(--semantic-token-SpinButton-1752, ${tokens.borderRadiusMedium}))`,
    paddingTop: '1px',
    paddingBottom: '4px',
  },
  // Padding values numbers don't align with design specs
  // but visually the padding aligns.
  // The icons are set in a 16x16px square but the artwork is inset from that
  // so these padding values are computed by hand.
  // Additionally the design uses fractional values so these are
  // rounded to the nearest integer.
  incrementButtonSmall: {
    padding: '3px 6px 0px 4px',
    height: '12px',
  },

  decrementButtonSmall: {
    padding: '0px 6px 3px 4px',
    height: '12px',
  },

  outline: {
    // set by useButtonClassName
  },

  underline: {
    backgroundColor: 'transparent',
    color: `var(--ctrl-token-SpinButton-1753, var(--semantic-token-SpinButton-1754, ${tokens.colorNeutralForeground3}))`,
    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1755, var(--semantic-token-SpinButton-1756, ${tokens.colorNeutralForeground3Hover}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1757, var(--semantic-token-SpinButton-1758, ${tokens.colorSubtleBackgroundHover}))`,
      },
      ':active': {
        color: `var(--ctrl-token-SpinButton-1759, var(--semantic-token-SpinButton-1760, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1761, var(--semantic-token-SpinButton-1762, ${tokens.colorSubtleBackgroundPressed}))`,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1763, var(--semantic-token-SpinButton-1764, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1765, var(--semantic-token-SpinButton-1766, ${tokens.colorSubtleBackgroundPressed}))`,
      },
    },
    ':disabled': {
      color: `var(--ctrl-token-SpinButton-1767, var(--semantic-token-SpinButton-1768, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
  'filled-darker': {
    backgroundColor: 'transparent',
    color: `var(--ctrl-token-SpinButton-1769, var(--semantic-token-SpinButton-1770, ${tokens.colorNeutralForeground3}))`,

    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1771, var(--semantic-token-SpinButton-1772, ${tokens.colorNeutralForeground3Hover}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1773, var(--semantic-token-SpinButton-1774, ${tokens.colorNeutralBackground3Hover}))`,
      },
      ':active': {
        color: `var(--ctrl-token-SpinButton-1775, var(--semantic-token-SpinButton-1776, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1777, var(--semantic-token-SpinButton-1778, ${tokens.colorNeutralBackground3Pressed}))`,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1779, var(--semantic-token-SpinButton-1780, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1781, var(--semantic-token-SpinButton-1782, ${tokens.colorNeutralBackground3Pressed}))`,
      },
    },
    ':disabled': {
      color: `var(--ctrl-token-SpinButton-1783, var(--semantic-token-SpinButton-1784, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
  'filled-lighter': {
    backgroundColor: 'transparent',
    color: `var(--ctrl-token-SpinButton-1785, var(--semantic-token-SpinButton-1786, ${tokens.colorNeutralForeground3}))`,

    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1787, var(--semantic-token-SpinButton-1788, ${tokens.colorNeutralForeground3Hover}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1789, var(--semantic-token-SpinButton-1790, ${tokens.colorNeutralBackground1Hover}))`,
      },
      [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1791, var(--semantic-token-SpinButton-1792, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--ctrl-token-SpinButton-1793, var(--semantic-token-SpinButton-1794, ${tokens.colorNeutralBackground1Pressed}))`,
      },
    },
    ':disabled': {
      color: `var(--ctrl-token-SpinButton-1795, var(--semantic-token-SpinButton-1796, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
});

// Cannot just disable button as they need to remain
// exposed to ATs like screen readers.
const useButtonDisabledStyles = makeStyles({
  base: {
    cursor: 'not-allowed',

    ':hover': {
      cursor: 'not-allowed',
    },
  },

  outline: {
    color: `var(--ctrl-token-SpinButton-1797, var(--semantic-token-SpinButton-1798, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1799, var(--semantic-token-SpinButton-1800, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--ctrl-token-SpinButton-1801, var(--semantic-token-SpinButton-1802, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1803, var(--semantic-token-SpinButton-1804, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },

  underline: {
    color: `var(--ctrl-token-SpinButton-1805, var(--semantic-token-SpinButton-1806, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1807, var(--semantic-token-SpinButton-1808, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--ctrl-token-SpinButton-1809, var(--semantic-token-SpinButton-1810, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1811, var(--semantic-token-SpinButton-1812, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },

  'filled-darker': {
    color: `var(--ctrl-token-SpinButton-1813, var(--semantic-token-SpinButton-1814, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1815, var(--semantic-token-SpinButton-1816, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--ctrl-token-SpinButton-1817, var(--semantic-token-SpinButton-1818, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1819, var(--semantic-token-SpinButton-1820, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },

  'filled-lighter': {
    color: `var(--ctrl-token-SpinButton-1821, var(--semantic-token-SpinButton-1822, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--ctrl-token-SpinButton-1823, var(--semantic-token-SpinButton-1824, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--ctrl-token-SpinButton-1825, var(--semantic-token-SpinButton-1826, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--ctrl-token-SpinButton-1827, var(--semantic-token-SpinButton-1828, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },
});

/**
 * Apply styling to the SpinButton slots based on the state
 */
export const useSpinButtonStyles_unstable = (state: SpinButtonState): SpinButtonState => {
  'use no memo';

  const { appearance, atBound, spinState, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const rootStyles = useRootStyles();
  const buttonStyles = useButtonStyles();
  const buttonDisabledStyles = useButtonDisabledStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    spinButtonClassNames.root,
    useRootClassName(),
    rootStyles[size],
    rootStyles[appearance],
    filled && rootStyles.filled,
    !disabled && appearance === 'outline' && rootStyles.outlineInteractive,
    !disabled && appearance === 'underline' && rootStyles.underlineInteractive,
    !disabled && filled && rootStyles.filledInteractive,
    !disabled && invalid && rootStyles.invalid,
    disabled && rootStyles.disabled,
    state.root.className,
  );

  state.incrementButton.className = mergeClasses(
    spinButtonClassNames.incrementButton,
    spinState === 'up' && `${spinButtonExtraClassNames.buttonActive}`,
    useBaseButtonClassName(),
    buttonStyles.increment,
    buttonStyles[appearance],
    size === 'small' && buttonStyles.incrementButtonSmall,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'max' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.incrementButton.className,
  );
  state.decrementButton.className = mergeClasses(
    spinButtonClassNames.decrementButton,
    spinState === 'down' && `${spinButtonExtraClassNames.buttonActive}`,
    useBaseButtonClassName(),
    buttonStyles.decrement,
    buttonStyles[appearance],
    size === 'small' && buttonStyles.decrementButtonSmall,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles.base,
    (atBound === 'min' || atBound === 'both') && buttonDisabledStyles[appearance],
    state.decrementButton.className,
  );

  state.input.className = mergeClasses(
    spinButtonClassNames.input,
    useInputClassName(),
    disabled && inputStyles.disabled,
    state.input.className,
  );

  return state;
};
