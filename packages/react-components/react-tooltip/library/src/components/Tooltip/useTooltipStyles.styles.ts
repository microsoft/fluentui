import { makeStyles, mergeClasses } from '@griffel/react';
import { createArrowStyles } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import { arrowHeight } from './private/constants';
import type { TooltipSlots, TooltipState } from './Tooltip.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tooltipClassNames: SlotClassNames<TooltipSlots> = {
  content: 'fui-Tooltip__content',
};

/**
 * Styles for the tooltip
 */
const useStyles = makeStyles({
  root: {
    display: 'none',
    boxSizing: 'border-box',
    maxWidth: '240px',
    cursor: 'default',
    fontFamily: `var(--ctrl-token-Tooltip-2835, var(--semantic-token-Tooltip-2836, ${tokens.fontFamilyBase}))`,
    fontSize: `var(--ctrl-token-Tooltip-2837, var(--semantic-token-Tooltip-2838, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--ctrl-token-Tooltip-2839, var(--semantic-token-Tooltip-2840, ${tokens.lineHeightBase200}))`,
    overflowWrap: 'break-word',
    borderRadius: `var(--ctrl-token-Tooltip-2841, var(--semantic-token-Tooltip-2842, ${tokens.borderRadiusMedium}))`,
    border: `1px solid ${tokens.colorTransparentStroke}`,
    padding: '4px 11px 6px 11px', // '5px 12px 7px 12px' minus the border width '1px'
    backgroundColor: `var(--ctrl-token-Tooltip-2843, var(--semantic-token-Tooltip-2844, ${tokens.colorNeutralBackground1}))`,
    color: `var(--ctrl-token-Tooltip-2845, var(--semantic-token-Tooltip-2846, ${tokens.colorNeutralForeground1}))`,

    // TODO need to add versions of tokens.alias.shadow.shadow8, etc. that work with filter
    filter:
      `drop-shadow(0 0 2px ${tokens.colorNeutralShadowAmbient}) ` +
      `drop-shadow(0 4px 8px ${tokens.colorNeutralShadowKey})`,
  },

  visible: {
    display: 'block',
  },

  inverted: {
    backgroundColor: `var(--ctrl-token-Tooltip-2847, var(--semantic-token-Tooltip-2848, ${tokens.colorNeutralBackgroundStatic}))`,
    color: `var(--ctrl-token-Tooltip-2849, var(--semantic-token-Tooltip-2850, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },

  arrow: createArrowStyles({ arrowHeight }),
});

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.content.className = mergeClasses(
    tooltipClassNames.content,
    styles.root,
    state.appearance === 'inverted' && styles.inverted,
    state.visible && styles.visible,
    state.content.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
