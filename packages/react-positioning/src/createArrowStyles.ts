import { MakeStylesStyle, shorthands } from '@fluentui/react-make-styles';
import type { Theme } from '@fluentui/react-theme';

/**
 * Options parameter for the createArrowStyles function
 */
export type CreateArrowStylesOptions = {
  /**
   * The height of the arrow from the base to the tip. The base width of the arrow is always twice its height.
   */
  arrowHeight?: number;

  /**
   * The border of the arrow. This should be the same border as the parent element.
   */
  border?: [width: string, style: string, color: string];
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
 *   state.arrowWithSize.className = styles.arrowWithSize
 *   state.arrowWithoutSize.className = mergeClasses(
 *     styles.arrowWithoutSize,
 *     state.smallArrow && styles.smallArrow,
 *     state.mediumArrow && styles.mediumArrow,
 *   )
 * ```
 */
export function createArrowStyles(theme: Theme, options: CreateArrowStylesOptions = {}): MakeStylesStyle {
  const { arrowHeight, border } = options;

  // const [borderWidth] = border || [0];

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
        ...shorthands.margin(`-${border[0]}`),
      }),
      borderBottomRightRadius: theme.borderRadiusSmall,
      transform: `rotate(var(--angle)) translate(0, 50%) rotate(45deg)`,
    },

    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    ':global([data-popper-placement^="top"])': {
      bottom: 0,
      // bottom: `-${borderWidth}`,
      '--angle': '0',
    },
    ':global([data-popper-placement^="right"])': {
      left: `0 /* @noflip */`,
      // left: `-${borderWidth} /* @noflip */`,
      '--angle': '90deg',
    },
    ':global([data-popper-placement^="bottom"])': {
      top: 0,
      // top: `-${borderWidth}`,
      '--angle': '180deg',
    },
    ':global([data-popper-placement^="left"])': {
      right: `0 /* @noflip */`,
      // right: `-${borderWidth} /* @noflip */`,
      '--angle': '270deg',
    },
  };
}

/**
 * Creates styles to size the arrow created by createArrowStyles to the given height.
 */
export function createArrowHeightStyles(arrowHeight: number): MakeStylesStyle {
  return {
    width: `${Math.SQRT2 * arrowHeight}px`,
    height: `${Math.SQRT2 * arrowHeight}px`,
  };
}
