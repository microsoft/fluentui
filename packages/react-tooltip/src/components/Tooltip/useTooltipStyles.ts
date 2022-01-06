import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createArrowStyles } from '@fluentui/react-positioning';
import type { TooltipState } from './Tooltip.types';

export const tooltipClassName = 'fui-Tooltip';

/**
 * Styles for the tooltip
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'none',
    boxSizing: 'border-box',
    maxWidth: '240px',
    cursor: 'default',
    fontFamily: theme.fontFamilyBase,
    fontSize: theme.fontSizeBase200,
    lineHeight: theme.lineHeightBase200,

    ...shorthands.borderRadius(theme.borderRadiusMedium), // Must match tooltipBorderRadius in useTooltip.tsx
    ...shorthands.border('1px', 'solid', theme.colorTransparentStroke),
    ...shorthands.padding('4px', '11px', '6px', '11px'), // '5px 12px 7px 12px' minus the border width '1px'
    backgroundColor: theme.colorNeutralBackground1,
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
    backgroundColor: theme.colorNeutralBackgroundInverted,
    color: theme.colorNeutralForegroundInverted,
  }),

  arrow: createArrowStyles({ arrowHeight: 6 }), // Must match arrowHeight in useTooltip.tsx
});

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.root.className = mergeClasses(
    tooltipClassName,
    styles.root,
    state.appearance === 'inverted' && styles.inverted,
    state.visible && styles.visible,
    state.root.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
