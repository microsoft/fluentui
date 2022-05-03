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
export interface CreateFocusOutlineStyleOptions extends CreateCustomFocusIndicatorStyleOptions {
  style?: Partial<FocusOutlineStyleOptions>;
}

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

/**
 * NOTE: The element with the focus outline needs to have `position: relative` so that the
 * pseudo element can be properly positioned.
 *
 * @param options - Configure the style of the focus outline
 * @returns focus outline styles object for @see makeStyles
 */
export const createFocusOutlineStyle = ({
  selector = defaultOptions.selector,
  style = defaultOptions.style,
}: CreateFocusOutlineStyleOptions = defaultOptions): GriffelStyle =>
  createCustomFocusIndicatorStyle(
    getFocusOutlineStyles({
      outlineColor: tokens.colorStrokeFocus2,
      outlineRadius: tokens.borderRadiusMedium,
      // FIXME: tokens.strokeWidthThick causes some weird bugs
      outlineWidth: '2px',
      ...style,
    }),
    { selector },
  );
