import { tokens } from '@fluentui/react-theme';
import type { GriffelStyle } from '@griffel/react';

/**
 * @internal
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
 * @internal
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
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: -1,

    ...(arrowHeight && createArrowHeightStyles(arrowHeight)),

    backgroundColor: 'inherit',
    backgroundClip: 'content-box',

    borderBottomLeftRadius: `${tokens.borderRadiusSmall} /* @noflip */`,
    transform: 'rotate(var(--fui-positioning-arrow-angle)) /* @noflip */',

    height: 'var(--fui-positioning-arrow-height)',
    width: 'var(--fui-positioning-arrow-height)',

    '::before': {
      content: '""',

      display: 'block',
      backgroundColor: 'inherit',
      margin: `-${borderWidth}`,
      width: '100%',
      height: '100%',

      border: `${borderWidth} ${borderStyle} ${borderColor}`,
      borderBottomLeftRadius: `${tokens.borderRadiusSmall} /* @noflip */`,

      clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    },

    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    ':global([data-popper-placement^="top"])': {
      bottom: 'var(--fui-positioning-arrow-offset)',
      '--fui-positioning-arrow-angle': '-45deg',
    },
    ':global([data-popper-placement^="right"])': {
      left: `var(--fui-positioning-arrow-offset) /* @noflip */`,
      '--fui-positioning-arrow-angle': '45deg',
    },
    ':global([data-popper-placement^="bottom"])': {
      top: 'var(--fui-positioning-arrow-offset)',
      '--fui-positioning-arrow-angle': '135deg',
    },
    ':global([data-popper-placement^="left"])': {
      right: `var(--fui-positioning-arrow-offset) /* @noflip */`,
      '--fui-positioning-arrow-angle': '225deg',
    },
  };
}

/**
 * @internal
 * Creates CSS styles to size the arrow created by createArrowStyles to the given height.
 *
 * Use this when you need to create classes for several different arrow sizes. If you only need a
 * constant arrow size, you can pass the `arrowHeight` param to createArrowStyles instead.
 */
export function createArrowHeightStyles(arrowHeight: number): GriffelStyle {
  // The arrow is a square rotated 45 degrees to have its bottom and right edges form a right triangle.
  // Multiply the triangle's height by sqrt(2) to get length of its edges.
  const edgeLength = 1.414 * arrowHeight;

  return {
    '--fui-positioning-arrow-height': `${edgeLength}px`,
    '--fui-positioning-arrow-offset': `${(edgeLength / 2) * -1}px`,
  };
}
