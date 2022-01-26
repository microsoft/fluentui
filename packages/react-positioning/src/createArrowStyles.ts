import { shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { GriffelStyle } from '@griffel/react';

/**
 * Options parameter for the createArrowStyles function
 */
export type CreateArrowStylesOptions = {
  /**
   * The height of the arrow from the base to the tip, in px. The base width of the arrow is always twice its height.
   *
   * This can be undefined to leave out the arrow size styles. You must then add styles created by
   * createArrowHeightStyles to set the arrow's size correctly. This can be useful if the arrow can be different sizes.
   */
  arrowHeight: number | undefined;

  /**
   * The borderWidth of the arrow. Should be the same borderWidth as the parent element.
   *
   * @defaultvalue 1px
   */
  borderWidth?: GriffelStyle['borderBottomWidth'];

  /**
   * The borderStyle for the arrow. Should be the same borderStyle as the parent element.
   *
   * @defaultvalue solid
   */
  borderStyle?: GriffelStyle['borderBottomStyle'];

  /**
   * The borderColor of the arrow. Should be the same borderColor as the parent element.
   *
   * @defaultvalue tokens.colorTransparentStroke
   */
  borderColor?: GriffelStyle['borderBottomColor'];
};

/**
 * Helper that creates a makeStyles rule for an arrow element.
 * For runtime arrow size toggling simply create extra classnames to apply to the arrow element
 *
 * ```ts
 *   makeStyles({
 *     arrowWithSize: createArrowStyles({ arrowHeight: 6 }),
 *
 *     arrowWithoutSize: createArrowStyles({ arrowHeight: undefined }),
 *     mediumArrow: createArrowHeightStyles(4),
 *     smallArrow: createArrowHeightStyles(2),
 *   })
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
export function createArrowStyles(options: CreateArrowStylesOptions): GriffelStyle {
  const {
    arrowHeight,
    borderWidth = '1px',
    borderStyle = 'solid',
    borderColor = tokens.colorTransparentStroke,
  } = options;

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
      ...shorthands.borderRight(
        `${borderWidth} /* @noflip */`,
        `${borderStyle} /* @noflip */`,
        `${borderColor} /* @noflip */`,
      ),
      ...shorthands.borderBottom(borderWidth, borderStyle, borderColor),
      borderBottomRightRadius: tokens.borderRadiusSmall,
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
