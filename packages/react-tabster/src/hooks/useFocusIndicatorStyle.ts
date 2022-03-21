import { tokens } from '@fluentui/react-theme';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';
import { shorthands } from '@griffel/react';
import type { GriffelStyle } from '@griffel/react';

export type FocusOutlineOffset = Record<'top' | 'bottom' | 'left' | 'right', string>;
export type FocusOutlineStyleOptions = {
  /**
   * Only property not supported by the native CSS `outline`, if this is no longer needed
   * we can just go native instead
   */
  outlineRadius: string;
  outlineColor: string;
  outlineWidth: string;
  outlineOffset?: string | FocusOutlineOffset;
};

/**
 * NOTE: the element with the focus outline needs to have `position: relative` so that the
 * pseudo element can be properly positioned.
 *
 * @param options - Configures the style of the focus outline
 * @returns focus outline styles object
 */
const getFocusOutlineStyles = (options: FocusOutlineStyleOptions): GriffelStyle => {
  const { outlineRadius, outlineColor, outlineOffset, outlineWidth } = options;

  const outlineOffsetTop = (outlineOffset as FocusOutlineOffset)?.top || outlineOffset;
  const outlineOffsetBottom = (outlineOffset as FocusOutlineOffset)?.bottom || outlineOffset;
  const outlineOffsetLeft = (outlineOffset as FocusOutlineOffset)?.left || outlineOffset;
  const outlineOffsetRight = (outlineOffset as FocusOutlineOffset)?.right || outlineOffset;

  return {
    ...shorthands.borderColor('transparent'),
    ':after': {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,

      ...shorthands.borderStyle('solid'),
      ...shorthands.borderWidth(outlineWidth),
      ...shorthands.borderRadius(outlineRadius),
      ...shorthands.borderColor(outlineColor),

      top: !outlineOffset ? `-${outlineWidth}` : `calc(0px - ${outlineWidth} - ${outlineOffsetTop})`,
      bottom: !outlineOffset ? `-${outlineWidth}` : `calc(0px - ${outlineWidth} - ${outlineOffsetBottom})`,
      left: !outlineOffset ? `-${outlineWidth}` : `calc(0px - ${outlineWidth} - ${outlineOffsetLeft})`,
      right: !outlineOffset ? `-${outlineWidth}` : `calc(0px - ${outlineWidth} - ${outlineOffsetRight})`,
    },
  };
};

export interface CreateFocusIndicatorStyleRuleOptions {
  selector?: 'focus' | 'focus-within';
}

const defaultOptions: CreateFocusIndicatorStyleRuleOptions = {
  selector: 'focus',
};

/**
 * NOTE: The element with the focus outline needs to have `position: relative` so that the
 * pseudo element can be properly positioned.
 *
 * @param options - Configure the style of the focus outline
 * @returns focus outline styles object for @see makeStyles
 */
export const createFocusOutlineStyle = (
  options: {
    style: Partial<FocusOutlineStyleOptions>;
  } & CreateFocusIndicatorStyleRuleOptions = { style: {}, ...defaultOptions },
): GriffelStyle => ({
  ':focus-visible': {
    outlineStyle: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${options.selector || defaultOptions.selector}`]: getFocusOutlineStyles({
    outlineColor: tokens.colorStrokeFocus2,
    outlineRadius: tokens.borderRadiusMedium,
    // FIXME: tokens.strokeWidthThick causes some weird bugs
    outlineWidth: '2px',
    ...options.style,
  }),
});

/**
 * Creates a style for @see makeStyles that includes the necessary selectors for focus.
 * Should be used only when @see createFocusOutlineStyle does not fit requirements
 *
 * @param style - styling applied on focus, defaults to @see getDefaultFocusOutlineStyes
 * @param options - Configure the style of the focus outline
 */
export const createCustomFocusIndicatorStyle = (
  style: GriffelStyle,
  options: CreateFocusIndicatorStyleRuleOptions = defaultOptions,
): GriffelStyle => ({
  ':focus-visible': {
    outlineStyle: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${options.selector || defaultOptions.selector}`]: style,
});

export type BottomFocusIndicatorOptions = CreateFocusIndicatorStyleRuleOptions & {
  borderWidth: string;
  borderRadius: string;
  borderColor: string;
  pressedBorderColor: string;
  targetChild?: keyof JSX.IntrinsicElements;
};

/**
 * Creates a bottom border focus indicator used in components such as Input and TextArea.
 * NOTE: This style uses border instead of outline
 *
 * @param options Configure the style of the focus indicator
 */
export const getBottomFocusIndicator = (options: BottomFocusIndicatorOptions): GriffelStyle => {
  const {
    selector = 'focus-within',
    borderWidth,
    borderRadius,
    borderColor,
    pressedBorderColor,
    targetChild,
  } = options;

  // disable default browser outline if `focus-within` selector is used.
  const outlineStyle =
    selector === 'focus-within'
      ? {
          [`& > ${targetChild}`]: {
            ':focus-visible': {
              outlineStyle: 'none',
            },
          },
        }
      : {};

  return {
    // It's supposed to be 2px flat all the way across and match the radius of the field's corners.
    ':after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      left: '-1px',
      bottom: '-1px',
      right: '-1px',

      // Maintaining the correct corner radius:
      // Use the whole border-radius as the height and only put radii on the bottom corners.
      // (Otherwise the radius would be automatically reduced to fit available space.)
      // max() ensures the focus border still shows up even if someone sets borderRadius to 0.
      height: `max(${borderWidth}, ${borderRadius})`,
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,

      // Flat border:
      // By default borderBottom will cause little "horns" on the ends. The clipPath trims them off.
      ...shorthands.borderBottom(borderWidth, 'solid', borderColor),
      clipPath: `inset(calc(100% - ${borderWidth}) 0 0 0)`,

      // Animation for focus OUT
      transform: 'scaleX(0)',
      transitionProperty: 'transform',

      // TODO: update duration and delay with tokens once available
      transitionDuration: '0.05s',
      transitionDelay: 'cubic-bezier(0.7,0,1,0.5)',
    },
    [`:${selector}:after`]: {
      // Animation for focus IN
      transform: 'scaleX(1)',
      transitionProperty: 'transform',

      // TODO: update duration and delay with tokens once available
      transitionDuration: '0.2s',
      transitionDelay: 'cubic-bezier(0.1,0.9,0.2,1)',
    },
    [`:${selector}:active:after`]: {
      // This is if the user clicks the field again while it's already focused
      borderBottomColor: pressedBorderColor,
    },
    [`:${selector}`]: {
      outlineWidth: borderWidth,
      outlineStyle: 'solid',
      outlineColor: 'transparent',
    },
    ...outlineStyle,
  };
};
