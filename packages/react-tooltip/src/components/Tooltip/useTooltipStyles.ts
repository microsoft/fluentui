import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createArrowStyles } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import { arrowHeight } from './private/constants';
import type { TooltipSlots, TooltipState } from './Tooltip.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `tooltipClassNames.root` instead.
 */
export const tooltipClassName = 'fui-Tooltip';
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
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,

    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    ...shorthands.padding('4px', '11px', '6px', '11px'), // '5px 12px 7px 12px' minus the border width '1px'
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

  arrow: createArrowStyles({ arrowHeight }),
});

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  const styles = useStyles();

  state.content.className = mergeClasses(
    /* eslint-disable-next-line deprecation/deprecation */
    tooltipClassName,
    tooltipClassNames.content,
    styles.root,
    state.appearance === 'inverted' && styles.inverted,
    state.visible && styles.visible,
    state.content.className,
  );

  state.arrowClassName = styles.arrow;

  return state;
};
