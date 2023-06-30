import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SwatchColorPikerCellProps, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';

/**
 * Create the state required to render SwatchColorPikerCell.
 *
 * The returned state can be modified with hooks such as useSwatchColorPikerCellStyles_unstable,
 * before being passed to renderSwatchColorPikerCell_unstable.
 *
 * @param props - props from this instance of SwatchColorPikerCell
 * @param ref - reference to root HTMLElement of SwatchColorPikerCell
 */
export const useSwatchColorPikerCell_unstable = (
  props: SwatchColorPikerCellProps,
  ref: React.Ref<HTMLElement>,
): SwatchColorPikerCellState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
