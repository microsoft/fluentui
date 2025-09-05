import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { infoButtonClassNames, type InfoButtonState } from '@fluentui/react-infolabel';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * Styles for the root slot
 */
const useButtonStyles = makeStyles({
  base: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',

    backgroundColor: semanticTokens.nullColor,
    color: semanticTokens.foregroundCtrlOnTransparentRest,

    ...shorthands.borderStyle('none'),
    borderRadius: semanticTokens.cornerCtrlRest,
    margin: '0',
    padding: semanticTokens.gapInsideCtrlSmDefault,

    [`& .${iconFilledClassName}`]: {
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'inline-flex',
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlOutlineHover,
      color: semanticTokens.foregroundCtrlOnTransparentHover,
      cursor: 'pointer',

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlOutlinePressed,
      color: semanticTokens.foregroundCtrlOnTransparentPressed,
    },
  },

  selected: {
    backgroundColor: semanticTokens.nullColor,
    color: semanticTokens._ctrlInfoLabelForegroundColorSelected,

    [`& .${iconFilledClassName}`]: {
      display: 'inline-flex',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      color: 'Canvas',
    },
  },

  highContrast: {
    '@media (forced-colors: active)': {
      color: 'CanvasText',

      ':hover,:hover:active': {
        forcedColorAdjust: 'none',
        backgroundColor: 'Highlight',
        color: 'Canvas',
      },
    },
  },

  focusIndicator: createFocusOutlineStyle(),

  large: {
    padding: semanticTokens.gapBetweenContentXSmall,
  },
});

const usePopoverSurfaceStyles = makeStyles({
  base: {
    maxWidth: '264px',
  },
  smallMedium: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textGlobalCaption1FontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textGlobalCaption1LineHeight,
  },
  large: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
  },
});

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useSemanticInfoButtonStyles = (_state: unknown): InfoButtonState => {
  'use no memo';

  const state = _state as InfoButtonState;

  const { size } = state;
  const { open } = state.popover;
  const buttonStyles = useButtonStyles();
  const popoverSurfaceStyles = usePopoverSurfaceStyles();

  state.info.className = mergeClasses(
    state.info.className,
    infoButtonClassNames.info,
    popoverSurfaceStyles.base,
    size === 'large' ? popoverSurfaceStyles.large : popoverSurfaceStyles.smallMedium,
    getSlotClassNameProp_unstable(state.info),
  );

  state.root.className = mergeClasses(
    state.root.className,
    infoButtonClassNames.root,
    buttonStyles.base,
    buttonStyles.highContrast,
    buttonStyles.focusIndicator,
    open && buttonStyles.selected,
    size === 'large' && buttonStyles.large,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
