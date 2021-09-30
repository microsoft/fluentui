import type { Theme } from '@fluentui/react-theme';
import type { MakeStylesStyleRule } from '@fluentui/make-styles';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';

type FocusOutlineOffset = Record<'top' | 'bottom' | 'left' | 'right', string>;
type FocusOutlineStyleOptions = {
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

/**
 *
 * @param theme - Fluent theme
 * @param options - Configures the style of the focus outline
 */
export const getDefaultFocusOutlineStyles = (theme: Theme, options: Partial<FocusOutlineStyleOptions> = {}) =>
  getFocusOutlineStyles({
    outlineColor: theme.alias.color.neutral.strokeFocus2,
    outlineRadius: theme.global.borderRadius.medium,
    // FIXME: theme.global.strokeWidth.thick causes some weird bugs
    outlineWidth: '2px',
    ...options,
  });

export interface CreateFocusIndicatorStyleRuleOptions {
  selector?: 'focus' | 'focus-within';
}

const defaultOptions: CreateFocusIndicatorStyleRuleOptions = {
  selector: 'focus',
};

/**
 * Creates a style rule for {@see makeStyles} that includes the necessary selectors for focus
 * @param rule - styling applied on focus, defaults to {@see getDefaultFocusOutlineStyes}
 */
export const createFocusIndicatorStyleRule = (
  rule: MakeStylesStyleRule<Theme> = getDefaultFocusOutlineStyles,
  options: CreateFocusIndicatorStyleRuleOptions = defaultOptions,
): MakeStylesStyleRule<Theme> => theme => ({
  ':focus-visible': {
    outline: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${options.selector || defaultOptions.selector}`]:
    typeof rule === 'function' ? rule(theme) : rule,
});
