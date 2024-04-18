import { shorthands } from '@griffel/react';
import type { GriffelStyle } from '@griffel/react';
import * as React from 'react';

/**
 * @internal
 * Options parameter for the createArrowStyles function
 */
export type CreateArrowStylesOptions = {
  /**
   * The height of the arrow from the base to the tip, in px. The base width of the arrow is always twice its height.
   */
  arrowHeight: number | undefined;

  /**
   * The borderWidth of the arrow. Should be the same borderWidth as the parent element.
   *
   * @defaultvalue 1px
   */
  borderWidth?: GriffelStyle['borderBottomWidth'];
  backgroundColor?: React.CSSProperties['backgroundColor'];
};

/**
 * @internal
 * Helper that creates a makeStyles rule for an arrow element.
 * For runtime arrow size toggling simply create extra classnames to apply to the arrow element
 *
 * ```ts
 *   makeStyles({
 *     arrow: createArrowStyles({ arrowHeight: 6 }),
 *   })
 * ```
 */
export function createArrowStyles(options: CreateArrowStylesOptions): GriffelStyle {
  const { arrowHeight, borderWidth = '1px', backgroundColor = 'transparent' } = options;

  return {
    position: 'absolute',
    zIndex: -1,
    width: 0,
    height: 0,
    boxSizing: 'border-box',
    ...shorthands.borderColor(backgroundColor),
    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    ':global([data-popper-placement^="top"])': {
      bottom: `-${borderWidth}`,
      ...shorthands.borderLeft(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderRight(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderTop(`${arrowHeight}px`, 'solid'),
      transform: 'translate(0, 100%)',
    },
    ':global([data-popper-placement^="right"])': {
      left: `-${borderWidth} /* @noflip */`,
      ...shorthands.borderTop(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderBottom(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderRight(`${arrowHeight}px`, 'solid'),
      transform: 'translate(-100%, 0)',
    },
    ':global([data-popper-placement^="bottom"])': {
      top: `-${borderWidth}`,
      ...shorthands.borderLeft(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderRight(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderBottom(`${arrowHeight}px`, 'solid'),
      transform: 'translate(0, -100%)',
    },
    ':global([data-popper-placement^="left"])': {
      right: `-${borderWidth} /* @noflip */`,
      ...shorthands.borderTop(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderBottom(`${arrowHeight}px`, 'solid', 'transparent'),
      ...shorthands.borderLeft(`${arrowHeight}px`, 'solid'),
      transform: 'translate(100%, 0)',
    },
  };
}
