import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { TooltipState } from './Tooltip.types';

/**
 * Styles for the tooltip
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'none',
    padding: '5px 12px 7px 12px',
    maxWidth: '240px',
    cursor: 'default',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,
    borderRadius: theme.borderRadiusMedium, // Update tooltipBorderRadius in useTooltip.tsx if this changes

    background: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground1,

    // TODO need to add versions of theme.alias.shadow.shadow8, etc. that work with filter
    filter:
      `drop-shadow(0 0 2px ${theme.colorNeutralShadowAmbient}) ` +
      `drop-shadow(0 4px 8px ${theme.colorNeutralShadowKey})`,
  }),

  visible: {
    display: 'block',
  },

  inverted: theme => ({
    background: theme.colorNeutralForeground2, // TODO should be neutralBackgroundInverted
    color: theme.colorNeutralForegroundInverted,
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
      borderBottomRightRadius: theme.borderRadiusSmall,
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
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    styles.root,
    state.appearance === 'inverted' && styles.inverted,
    state.visible && styles.visible,
    state.root.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
