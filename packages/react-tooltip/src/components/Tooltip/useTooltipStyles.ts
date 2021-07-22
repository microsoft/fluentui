import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { TooltipState } from './Tooltip.types';

/**
 * Styles for the tooltip
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
    borderRadius: theme.global.borderRadius.medium, // Update tooltipBorderRadius in useTooltip.tsx if this changes

    background: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,

    // TODO need to add versions of theme.alias.shadow.shadow8, etc. that work with filter
    filter:
      `drop-shadow(0 0 2px ${theme.alias.color.neutral.neutralShadowAmbient}) ` +
      `drop-shadow(0 4px 8px ${theme.alias.color.neutral.neutralShadowKey})`,
  }),

  visible: {
    display: 'block',
  },

  inverted: theme => ({
    background: theme.alias.color.neutral.neutralForeground2, // TODO should be neutralBackgroundInverted
    color: theme.alias.color.neutral.neutralForegroundInverted,
  }),

  arrow: theme => ({
    position: 'absolute',
    width: '8.485px', //  width and height = arrowHeight * sqrt(2)
    height: '8.485px', // Update arrowHeight in useTooltip.tsx if this changes
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

    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    ':global([data-popper-placement^="top"])': { bottom: 0, '--angle': '0' },
    ':global([data-popper-placement^="right"])': { left: 0, '--angle': '90deg' },
    ':global([data-popper-placement^="bottom"])': { top: 0, '--angle': '180deg' },
    ':global([data-popper-placement^="left"])': { right: 0, '--angle': '270deg' },
  }),
});

/**
 * Apply styling to the Tooltip slots based on the state
 * {@docCategory Tooltip}
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.className = mergeClasses(
    styles.root,
    state.inverted && styles.inverted,
    state.visible && styles.visible,
    state.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
