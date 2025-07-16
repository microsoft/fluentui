import { makeStyles, mergeClasses } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { TooltipState } from '@fluentui/react-tooltip';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  root: {
    borderRadius: semanticTokens.ctrlTooltipCorner,

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

  // Semantic-tokens does not include inverted tokens, use existing tokens for now.
  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },
});

export const useSemanticTooltipStyles = (_state: unknown): TooltipState => {
  'use no memo';

  const state = _state as TooltipState;

  const styles = useStyles();
  const { appearance } = state;

  state.content.className = mergeClasses(
    state.content.className,
    appearance === 'inverted' && styles.inverted,
    styles.root,
    getSlotClassNameProp_unstable(state.content),
  );

  return state;
};
