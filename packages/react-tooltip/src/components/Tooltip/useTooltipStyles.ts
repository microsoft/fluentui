import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createArrowStyles } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import type { TooltipState } from './Tooltip.types';

export const tooltipClassName = 'fui-Tooltip';

/**
 * Styles for the tooltip
 */
const useStyles = makeStyles({
  root: {
    display: 'none',
    ...shorthands.padding('5px', '12px', '7px', '12px'),
    maxWidth: '240px',
    cursor: 'default',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,

    // Update tooltipBorderRadius in useTooltip.tsx if this changes
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,

    // TODO need to add versions of tokens.alias.shadow.shadow8, etc. that work with filter
    filter:
      `drop-shadow(0 0 2px ${tokens.colorNeutralShadowAmbient}) ` +
      `drop-shadow(0 4px 8px ${tokens.colorNeutralShadowKey})`,
  },

  visible: {
    display: 'block',
  },

  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
  },

  // width and height = arrowHeight * sqrt(2)
  // Update arrowHeight in useTooltip.tsx if this changes
  arrow: createArrowStyles(8.485),
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
