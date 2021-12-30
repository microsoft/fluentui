import { MakeStylesStyle, shorthands } from '@fluentui/react-make-styles';
import type { Theme } from '@fluentui/react-theme';

/**
 * Options parameter for the createArrowStyles function
 */
export type CreateArrowStylesOptions = {
  /**
   * The height of the arrow from the base to the tip. The base width of the arrow is always twice its height.
   *
   * If this is omitted, you must add styles created by createArrowHeightStyles to set the arrow's size correctly.
   */
  arrowHeight?: number;

  /**
   * The border of the arrow. This should be the same border as the parent element.
   */
  border?: [/*width:*/ string, /*style:*/ string, /*color:*/ string];
};

/**
 * Helper that creates a makeStyles rule for an arrow element.
 * For runtime arrow size toggling simply create extra classnames to apply to the arrow element
 *
 * ```ts
 *   makeStyles(theme => ({
 *     arrowWithSize: createArrowStyles(theme, { arrowHeight: 6 }),
 *
 *     arrowWithoutSize: createArrowStyles(theme),
 *     mediumArrow: createArrowHeightStyles(4),
 *     smallArrow: createArrowHeightStyles(2),
 *   }))
 *   ...
 *
 *   state.arrowWithSize.className = styles.arrowWithSize;
 *   state.arrowWithoutSize.className = mergeClasses(
 *     styles.arrowWithoutSize,
 *     state.smallArrow && styles.smallArrow,
 *     state.mediumArrow && styles.mediumArrow,
 *   )
 * ```
 */
export function createArrowStyles(theme: Theme, options: CreateArrowStylesOptions = {}): MakeStylesStyle {
  const { arrowHeight, border } = options;
  const [borderWidth] = border || [0];

  return {
    position: 'absolute',
    backgroundColor: 'inherit',
    visibility: 'hidden',
    zIndex: -1,

    ...(arrowHeight && createArrowHeightStyles(arrowHeight)),

    ':before': {
      content: '""',
      visibility: 'visible',
      position: 'absolute',
      boxSizing: 'border-box',
      width: 'inherit',
      height: 'inherit',
      backgroundColor: 'inherit',
      ...(border && {
        ...shorthands.borderRight(...border),
        ...shorthands.borderBottom(...border),
      }),
      borderBottomRightRadius: theme.borderRadiusSmall,
      transform: 'rotate(var(--angle)) translate(0, 50%) rotate(45deg)',
    },

    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    ':global([data-popper-placement^="top"])': {
      bottom: `-${borderWidth}`,
      '--angle': '0',
    },
    ':global([data-popper-placement^="right"])': {
      left: `-${borderWidth} /* @noflip */`,
      '--angle': '90deg',
    },
    ':global([data-popper-placement^="bottom"])': {
      top: `-${borderWidth}`,
      '--angle': '180deg',
    },
    ':global([data-popper-placement^="left"])': {
      right: `-${borderWidth} /* @noflip */`,
      '--angle': '270deg',
    },
  };
}

/**
 * Creates CSS styles to size the arrow created by createArrowStyles to the given height.
 *
 * Use this when you need to create classes for several different arrow sizes. If you only need a
 * constant arrow size, you can pass the `arrowHeight` param to createArrowStyles instead.
 */
export function createArrowHeightStyles(arrowHeight: number) {
  // The arrow is a square rotated 45 degrees to have its bottom and right edges form a right triangle.
  // Multiply the triangle's height by sqrt(2) to get length of its edges.
  const edgeLength = `${1.414 * arrowHeight}px`;
  return { width: edgeLength, height: edgeLength };
}
