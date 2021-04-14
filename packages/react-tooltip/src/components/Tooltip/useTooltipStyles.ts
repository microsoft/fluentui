import { makeStyles, ax } from '@fluentui/react-make-styles';
import { TooltipState } from './Tooltip.types';
import { Theme } from '@fluentui/react-theme';

/**
 * The height of the triangle used for the arrow that points at the tooltip's target
 */
export const arrowHeight = 6;

export const tooltipBorderRadius = (theme: Theme) => theme.global.borderRadius.medium;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'none',
    padding: '5px 12px 7px 12px',
    maxWidth: '240px',
    cursor: 'default',
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.lineHeights.base[200],
    borderRadius: tooltipBorderRadius(theme),

    background: theme.alias.color.neutral.neutralForeground2, // TODO should be neutralBackgroundInverted
    color: theme.alias.color.neutral.neutralForegroundInverted,

    // TODO need to add versions of theme.alias.shadow.shadow8, etc. that work with filter
    filter:
      `drop-shadow(0 0 2px ${theme.alias.color.neutral.neutralShadowAmbient}) ` +
      `drop-shadow(0 4px 8px ${theme.alias.color.neutral.neutralShadowKey})`,

    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    '&[data-popper-placement^="top"] > .tooltip-arrow': { bottom: 0, '--angle': '0' },
    '&[data-popper-placement^="right"] > .tooltip-arrow': { left: 0, '--angle': '90deg' },
    '&[data-popper-placement^="bottom"] > .tooltip-arrow': { top: 0, '--angle': '180deg' },
    '&[data-popper-placement^="left"] > .tooltip-arrow': { right: 0, '--angle': '270deg' },
  }),

  visible: {
    display: 'block',
  },

  subtle: theme => ({
    background: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,
  }),

  arrow: theme => ({
    position: 'absolute',
    width: `${Math.SQRT2 * arrowHeight}px`,
    height: `${Math.SQRT2 * arrowHeight}px`,
    background: 'inherit',
    visibility: 'hidden',
    zIndex: -1,

    ':before': {
      content: '""',
      position: 'absolute',
      width: 'inherit',
      height: 'inherit',
      background: 'inherit',
      visibility: 'visible',
      borderBottomRightRadius: theme.global.borderRadius.small,
      transform: 'rotate(var(--angle)) translate(0, 50%) rotate(45deg)',
    },
  }),
});

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip}
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.className = ax(styles.root, state.subtle && styles.subtle, state.visible && styles.visible, state.className);

  if (state.arrow) {
    state.arrow.className = ax('tooltip-arrow', styles.arrow, state.arrow.className);
  }

  return state;
};
