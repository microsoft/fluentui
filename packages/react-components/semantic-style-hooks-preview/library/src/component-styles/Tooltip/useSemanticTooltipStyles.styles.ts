import { makeStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { TooltipState } from '@fluentui/react-tooltip';
import { tokens } from '@fluentui/react-theme';
import { createArrowStyles } from '@fluentui/react-positioning';

const useStyles = makeStyles({
  root: {
    display: 'none',
    boxSizing: 'border-box',
    maxWidth: '240px',
    cursor: 'default',
    overflowWrap: 'break-word',

    borderRadius: semanticTokens.ctrlTooltipCorner,
    border: `1px solid ${semanticTokens.strokeLayer}`,

    paddingTop: semanticTokens._ctrlTooltipPaddingTop,
    paddingBottom: semanticTokens._ctrlTooltipPaddingBottom,
    paddingLeft: semanticTokens._ctrlTooltipPaddingLeft,
    paddingRight: semanticTokens._ctrlTooltipPaddingRight,

    backgroundColor: semanticTokens.ctrlTooltipBackground,
    color: semanticTokens.ctrlTooltipForeground,

    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampMetadataFontSize,
    lineHeight: semanticTokens.textRampMetadataLineHeight,

    filter: semanticTokens._ctrlTooltipShadow,
  },
  visible: {
    display: 'block',
  },

  // Semantic-tokens does not include inverted tokens, use existing tokens for now.
  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  // 6 is defined by a constant internal to tooltip
  // I don't know if any tokens for it, or if it should be a token.
  arrow: createArrowStyles({ arrowHeight: 6, borderColor: semanticTokens.strokeLayer }),
});

export const useSemanticTooltipStyles = (_state: unknown): TooltipState => {
  'use no memo';

  const state = _state as TooltipState;

  const styles = useStyles();
  const { appearance, visible } = state;

  state.content.className = mergeClasses(
    state.content.className,
    styles.root,
    appearance === 'inverted' && styles.inverted,
    visible && styles.visible,
    getSlotClassNameProp_unstable(state.content),
  );

  state.arrowClassName = styles.arrow;

  return state;
};
