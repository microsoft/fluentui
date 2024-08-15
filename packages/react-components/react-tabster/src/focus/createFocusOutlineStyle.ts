import { tokens } from '@fluentui/react-theme';
import { shorthands } from '@griffel/react';
import type { GriffelStyle } from '@griffel/react';
import {
  createCustomFocusIndicatorStyle,
  CreateCustomFocusIndicatorStyleOptions,
} from './createCustomFocusIndicatorStyle';
import { defaultOptions } from './constants';

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
export interface CreateFocusOutlineStyleOptions extends Omit<CreateCustomFocusIndicatorStyleOptions, 'enableOutline'> {
  style?: Partial<FocusOutlineStyleOptions>;

  /**
   * Enables the browser default outline style
   */
  enableOutline?: boolean;
}

/**
 * Get the position of the focus outline
 *
 * @param options - Configures the style of the focus outline
 * @param position - The position of the focus outline
 * @returns CSS value for the position of the focus outline
 */
function getOutlinePosition(
  { outlineWidth, outlineOffset }: FocusOutlineStyleOptions,
  position: 'top' | 'bottom' | 'left' | 'right',
) {
  const offsetValue = (outlineOffset as FocusOutlineOffset)?.[position] || outlineOffset;

  if (!outlineOffset) {
    return `calc(${outlineWidth} * -1)`;
  }

  return `calc(0px - ${outlineWidth} - ${offsetValue})`;
}

/**
 * NOTE: the element with the focus outline needs to have `position: relative` so that the
 * pseudo element can be properly positioned.
 *
 * @param options - Configures the style of the focus outline
 * @returns focus outline styles object
 */
const getFocusOutlineStyles = (options: FocusOutlineStyleOptions): GriffelStyle => {
  const { outlineRadius, outlineColor, outlineWidth } = options;

  return {
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

      border: `${outlineWidth} solid ${outlineColor}`,
      borderRadius: outlineRadius,

      top: getOutlinePosition(options, 'top'),
      right: getOutlinePosition(options, 'right'),
      bottom: getOutlinePosition(options, 'bottom'),
      left: getOutlinePosition(options, 'left'),
    },
  };
};

/**
 * NOTE: The element with the focus outline needs to have `position: relative` so that the
 * pseudo element can be properly positioned.
 *
 * @param options - Configure the style of the focus outline
 * @returns focus outline styles object for @see makeStyles
 */
export const createFocusOutlineStyle = ({
  enableOutline = false,
  selector = defaultOptions.selector,
  customizeSelector,
  style = defaultOptions.style,
}: CreateFocusOutlineStyleOptions = defaultOptions): GriffelStyle => ({
  ':focus': {
    outlineStyle: enableOutline ? undefined : 'none',
  },
  ':focus-visible': {
    outlineStyle: enableOutline ? undefined : 'none',
  },

  ...createCustomFocusIndicatorStyle(
    getFocusOutlineStyles({
      outlineColor: tokens.colorStrokeFocus2,
      outlineRadius: tokens.borderRadiusMedium,
      // FIXME: tokens.strokeWidthThick causes some weird bugs
      outlineWidth: '2px',
      ...style,
    }),
    { selector, customizeSelector },
  ),
});
