import type { MakeStylesStyleRule } from '@fluentui/make-styles';
import type { Theme } from '@fluentui/react-theme';

/**
 * Helper that creates a makeStyles rule for an arrow element.
 * For runtime arrow size toggling simply create extra classnames to apply to the arrow element
 *
 * ```ts
 *   makeStyles({
 *     arrow: createArrowStyles(),
 *     smallArrow: { aspectRatio: 1, width: '2px' }
 *   })
 *   ...
 *
 *   state.arrow.clasName = mergeClasses(styles.arrow, styles.smallArrow)
 * ```
 *
 * @param - size dimensions of the square arrow element in pixels.
 */
export function createArrowStyles(size?: number): MakeStylesStyleRule<Theme> {
  return theme => {
    const arrowHCBorderStyle = `1px solid transparent`;
    const arrowHCBorder = {
      borderRight: arrowHCBorderStyle,
      borderBottom: arrowHCBorderStyle,
    };

    return {
      position: 'absolute',
      background: 'inherit',
      visibility: 'hidden',
      zIndex: -1,

      ...(size && { aspectRatio: 1, with: `${size}px` }),

      ':before': {
        content: '""',
        borderRadius: '4px',
        position: 'absolute',
        width: 'inherit',
        height: 'inherit',
        background: 'inherit',
        visibility: 'visible',
        borderBottomRightRadius: theme.borderRadiusSmall,
        transform: 'rotate(var(--angle)) translate(0, 50%) rotate(45deg)',
      },

      // Popper sets data-popper-placement on the root element, which is used to align the arrow
      ':global([data-popper-placement^="top"])': {
        bottom: 0,
        '--angle': '0',
        ':before': arrowHCBorder,
      },

      ':global([data-popper-placement^="right"])': {
        left: 0,
        '--angle': '90deg',
        ':before': arrowHCBorder,
      },
      ':global([data-popper-placement^="bottom"])': {
        top: 0,
        '--angle': '180deg',
        ':before': arrowHCBorder,
      },
      ':global([data-popper-placement^="left"])': {
        right: 0,
        '--angle': '270deg',
        ':before': arrowHCBorder,
      },
    };
  };
}
