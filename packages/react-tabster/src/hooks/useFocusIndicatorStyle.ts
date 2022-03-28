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
