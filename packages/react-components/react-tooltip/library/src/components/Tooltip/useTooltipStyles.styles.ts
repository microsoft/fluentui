import { makeStyles, mergeClasses } from '@griffel/react';
import { createArrowStyles } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import { arrowHeight } from './private/constants';
import type { TooltipSlots, TooltipState } from './Tooltip.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { MaterialType } from '@fluentui/react-shared-contexts';

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
    overflowWrap: 'break-word',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorTransparentStroke}`,
    padding: '4px 11px 6px 11px', // '5px 12px 7px 12px' minus the border width '1px'
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
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  arrow: createArrowStyles({ arrowHeight }),
});

const useMaterialTypeStyles = makeStyles<MaterialType>({
  [MaterialType.Opaque]: {},
  [MaterialType.SemiOpaque]: {
    backdropFilter: 'blur(80px)',
    boxShadow: tokens.shadow16,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
  },
  [MaterialType.Translucent]: {
    backdropFilter: 'blur(45px)',
    boxShadow: tokens.shadow16,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
  },
  [MaterialType.SemiTransparent]: {
    backdropFilter: 'blur(30px)',
    boxShadow: tokens.shadow16,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackgroundAlpha,
  },
});

/**
 * Apply styling to the Tooltip slots based on the state
 */
export const useTooltipStyles_unstable = (state: TooltipState): TooltipState => {
  'use no memo';

  const styles = useStyles();
  const materialTypeStyles = useMaterialTypeStyles();

  state.content.className = mergeClasses(
    tooltipClassNames.content,
    styles.root,
    state.appearance === 'inverted' && styles.inverted,
    state.visible && styles.visible,
    state.content.className,
    state.materialType && materialTypeStyles[state.materialType],
  );

  state.arrowClassName = styles.arrow;

  return state;
};
