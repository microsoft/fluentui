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
  columnGap: `var(--1679, var(--1680, ${tokens.spacingHorizontalXS}))`,
  rowGap: 0,
  position: 'relative',
  isolation: 'isolate',
  verticalAlign: 'middle',

  backgroundColor: `var(--1681, var(--1682, ${tokens.colorNeutralBackground1}))`,
  minHeight: fieldHeights.medium,
  padding: `0 0 0 ${tokens.spacingHorizontalMNudge}`,
  borderRadius: `var(--1683, var(--1684, ${tokens.borderRadiusMedium}))`,

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
    borderBottomColor: `var(--1685, var(--1686, ${tokens.colorNeutralStrokeAccessible}))`,
    borderRadius: `var(--1687, var(--1688, ${tokens.borderRadiusMedium}))`,
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
    borderBottomLeftRadius: `var(--1689, var(--1690, ${tokens.borderRadiusMedium}))`,
    borderBottomRightRadius: `var(--1691, var(--1692, ${tokens.borderRadiusMedium}))`,

    // Flat 2px border:
    // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
    // (This could be done without trimming using `background: linear-gradient(...)`, but using
    // borderBottom makes it easier for people to override the color if needed.)
    borderBottom: `2px solid ${tokens.colorCompoundBrandStroke}`,
    clipPath: 'inset(calc(100% - 2px) 0 0 0)',

    // Animation for focus OUT
    transform: 'scaleX(0)',
    transitionProperty: 'transform',
    transitionDuration: `var(--1693, var(--1694, ${tokens.durationUltraFast}))`,
    transitionDelay: `var(--1695, var(--1696, ${tokens.curveAccelerateMid}))`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },

  ':focus-within::after': {
    // Animation for focus IN
    transform: 'scaleX(1)',
    transitionProperty: 'transform',
    transitionDuration: `var(--1697, var(--1698, ${tokens.durationNormal}))`,
    transitionDelay: `var(--1699, var(--1700, ${tokens.curveDecelerateMid}))`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      transitionDelay: '0.01ms',
    },
  },
  ':focus-within:active::after': {
    // This is if the user clicks the field again while it's already focused
    borderBottomColor: `var(--1701, var(--1702, ${tokens.colorCompoundBrandStrokePressed}))`,
  },
  ':focus-within': {
    outline: '2px solid transparent',
  },
});

const useRootStyles = makeStyles({
  small: {
    minHeight: fieldHeights.small,
    ...typographyStyles.caption1,
    paddingLeft: `var(--1703, var(--1704, ${tokens.spacingHorizontalS}))`,
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
      borderBottomColor: `var(--1705, var(--1706, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
        borderBottomColor: `var(--1707, var(--1708, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
      },
    },
  },

  underline: {
    '::before': {
      ...shorthands.borderWidth(0, 0, '1px', 0),
      borderRadius: `var(--1709, var(--1710, ${tokens.borderRadiusNone}))`, // corners look strange if rounded
    },
  },

  underlineInteractive: {
    ':hover::before': {
      borderBottomColor: `var(--1711, var(--1712, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },
    // DO NOT add a space between the selectors! It changes the behavior of make-styles.
    ':active,:focus-within': {
      '::before': {
        borderBottomColor: `var(--1713, var(--1714, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
      },
    },
    '::after': {
      borderRadius: `var(--1715, var(--1716, ${tokens.borderRadiusNone}))`, // remove rounded corners from focus underline
    },
  },

  filled: {
    '::before': {
      border: `1px solid ${tokens.colorTransparentStroke}`,
    },
  },

  'filled-darker': {
    backgroundColor: `var(--1717, var(--1718, ${tokens.colorNeutralBackground3}))`,
  },
  'filled-lighter': {
    backgroundColor: `var(--1719, var(--1720, ${tokens.colorNeutralBackground1}))`,
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
    backgroundColor: `var(--1721, var(--1722, ${tokens.colorTransparentBackground}))`,
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
  color: `var(--1723, var(--1724, ${tokens.colorNeutralForeground1}))`,
  // Use literal "transparent" (not from the theme) to always let the color from the root show through
  backgroundColor: 'transparent',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  width: '100%',

  '::placeholder': {
    color: `var(--1725, var(--1726, ${tokens.colorNeutralForeground4}))`,
    opacity: 1, // browser style override
  },
});

const useInputStyles = makeStyles({
  disabled: {
    color: `var(--1727, var(--1728, ${tokens.colorNeutralForegroundDisabled}))`,
    cursor: 'not-allowed',
    backgroundColor: `var(--1729, var(--1730, ${tokens.colorTransparentBackground}))`,
    '::placeholder': {
      color: `var(--1731, var(--1732, ${tokens.colorNeutralForegroundDisabled}))`,
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
  color: `var(--1733, var(--1734, ${tokens.colorNeutralForeground3}))`,

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
      color: `var(--1735, var(--1736, ${tokens.colorNeutralForeground3Hover}))`,
      backgroundColor: `var(--1737, var(--1738, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      color: `var(--1739, var(--1740, ${tokens.colorNeutralForeground3Pressed}))`,
      backgroundColor: `var(--1741, var(--1742, ${tokens.colorSubtleBackgroundPressed}))`,
    },
    [`&.${spinButtonExtraClassNames.buttonActive}`]: {
      color: `var(--1743, var(--1744, ${tokens.colorNeutralForeground3Pressed}))`,
      backgroundColor: `var(--1745, var(--1746, ${tokens.colorSubtleBackgroundPressed}))`,
    },
  },

  ':disabled': {
    cursor: 'not-allowed',
    color: `var(--1747, var(--1748, ${tokens.colorNeutralForegroundDisabled}))`,
  },
});

const useButtonStyles = makeStyles({
  increment: {
    gridRowStart: '1',
    borderTopRightRadius: `var(--1749, var(--1750, ${tokens.borderRadiusMedium}))`,
    paddingTop: '4px',
    paddingBottom: '1px',
  },
  decrement: {
    gridRowStart: '2',
    borderBottomRightRadius: `var(--1751, var(--1752, ${tokens.borderRadiusMedium}))`,
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
    color: `var(--1753, var(--1754, ${tokens.colorNeutralForeground3}))`,
    ':enabled': {
      ':hover': {
        color: `var(--1755, var(--1756, ${tokens.colorNeutralForeground3Hover}))`,
        backgroundColor: `var(--1757, var(--1758, ${tokens.colorSubtleBackgroundHover}))`,
      },
      ':active': {
        color: `var(--1759, var(--1760, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--1761, var(--1762, ${tokens.colorSubtleBackgroundPressed}))`,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1763, var(--1764, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--1765, var(--1766, ${tokens.colorSubtleBackgroundPressed}))`,
      },
    },
    ':disabled': {
      color: `var(--1767, var(--1768, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
  'filled-darker': {
    backgroundColor: 'transparent',
    color: `var(--1769, var(--1770, ${tokens.colorNeutralForeground3}))`,

    ':enabled': {
      ':hover': {
        color: `var(--1771, var(--1772, ${tokens.colorNeutralForeground3Hover}))`,
        backgroundColor: `var(--1773, var(--1774, ${tokens.colorNeutralBackground3Hover}))`,
      },
      ':active': {
        color: `var(--1775, var(--1776, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--1777, var(--1778, ${tokens.colorNeutralBackground3Pressed}))`,
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1779, var(--1780, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--1781, var(--1782, ${tokens.colorNeutralBackground3Pressed}))`,
      },
    },
    ':disabled': {
      color: `var(--1783, var(--1784, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
  'filled-lighter': {
    backgroundColor: 'transparent',
    color: `var(--1785, var(--1786, ${tokens.colorNeutralForeground3}))`,

    ':enabled': {
      ':hover': {
        color: `var(--1787, var(--1788, ${tokens.colorNeutralForeground3Hover}))`,
        backgroundColor: `var(--1789, var(--1790, ${tokens.colorNeutralBackground1Hover}))`,
      },
      [`:active,&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1791, var(--1792, ${tokens.colorNeutralForeground3Pressed}))`,
        backgroundColor: `var(--1793, var(--1794, ${tokens.colorNeutralBackground1Pressed}))`,
      },
    },
    ':disabled': {
      color: `var(--1795, var(--1796, ${tokens.colorNeutralForegroundDisabled}))`,
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
    color: `var(--1797, var(--1798, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--1799, var(--1800, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--1801, var(--1802, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1803, var(--1804, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },

  underline: {
    color: `var(--1805, var(--1806, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--1807, var(--1808, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--1809, var(--1810, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1811, var(--1812, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },

  'filled-darker': {
    color: `var(--1813, var(--1814, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--1815, var(--1816, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--1817, var(--1818, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1819, var(--1820, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
    },
  },

  'filled-lighter': {
    color: `var(--1821, var(--1822, ${tokens.colorNeutralForegroundDisabled}))`,
    ':enabled': {
      ':hover': {
        color: `var(--1823, var(--1824, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      ':active': {
        color: `var(--1825, var(--1826, ${tokens.colorNeutralForegroundDisabled}))`,
        backgroundColor: 'transparent',
      },
      [`&.${spinButtonExtraClassNames.buttonActive}`]: {
        color: `var(--1827, var(--1828, ${tokens.colorNeutralForegroundDisabled}))`,
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
