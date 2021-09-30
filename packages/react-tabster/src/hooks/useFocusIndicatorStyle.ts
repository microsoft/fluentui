import type { Theme } from '@fluentui/react-theme';
import type { MakeStyles, MakeStylesStyleRule } from '@fluentui/make-styles';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';

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
const getFocusOutlineStyles = (options: FocusOutlineStyleOptions) => {
  const { outlineRadius, outlineColor, outlineOffset, outlineWidth } = options;

  const outlineOffsetTop = (outlineOffset as FocusOutlineOffset)?.top || outlineOffset;
  const outlineOffsetBottom = (outlineOffset as FocusOutlineOffset)?.bottom || outlineOffset;
  const outlineOffsetLeft = (outlineOffset as FocusOutlineOffset)?.left || outlineOffset;
  const outlineOffsetRight = (outlineOffset as FocusOutlineOffset)?.right || outlineOffset;

  return {
    borderColor: 'transparent',
    ':after': {
      content: '""',
      position: 'absolute',
      pointerEvents: 'none',
      boxSizing: 'outline-box',
      zIndex: 1,

      borderStyle: 'solid',
      borderWidth: outlineWidth,
      borderRadius: outlineRadius,
      borderColor: outlineColor,

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
 * @param theme - Theme used in {@see makeStyles}
 * @param options - Configure the style of the focus outline
 * @returns focus outline styles object for {@see makeStyles}
 */
export const createFocusOutlineStyle = (
  theme: Theme,
  options: {
    style: Partial<FocusOutlineStyleOptions>;
  } & CreateFocusIndicatorStyleRuleOptions = { style: {}, ...defaultOptions },
): MakeStyles => ({
  ':focus-visible': {
    outline: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${options.selector || defaultOptions.selector}`]: getFocusOutlineStyles({
    outlineColor: theme.alias.color.neutral.strokeFocus2,
    outlineRadius: theme.global.borderRadius.medium,
    // FIXME: theme.global.strokeWidth.thick causes some weird bugs
    outlineWidth: '2px',
    ...options.style,
  }),
});

/**
 * Creates a style rule for {@see makeStyles} that includes the necessary selectors for focus.
 * Should be used only when {@see createFocusOutlineStyle} does not fit requirements
 *
 * @param rule - styling applied on focus, defaults to {@see getDefaultFocusOutlineStyes}
 */
export const createCustomFocusIndicatorStyle = (
  rule: MakeStylesStyleRule<Theme>,
  options: CreateFocusIndicatorStyleRuleOptions = defaultOptions,
): MakeStylesStyleRule<Theme> => theme => ({
  ':focus-visible': {
    outline: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${options.selector || defaultOptions.selector}`]:
    typeof rule === 'function' ? rule(theme) : rule,
});
