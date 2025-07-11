import { mergeClasses, makeStyles } from '@griffel/react';
import { menuPopoverClassNames, type MenuPopoverState } from '@fluentui/react-menu';
import { createSlideStyles } from '@fluentui/react-positioning';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  root: {
    borderRadius: semanticTokens._ctrlMenuPopoverCornerFlyoutRest,
    backgroundColor: semanticTokens.materialAcrylicDefaultSolid,
    color: semanticTokens.foregroundContentNeutralPrimary,
    boxSizing: 'border-box',
    minWidth: '138px',
    maxWidth: '300px',
    overflowX: 'hidden',
    width: 'max-content',
    boxShadow: semanticTokens._ctrlMenuPopoverShadowFlyout,
    padding: semanticTokens.paddingFlyoutDefault,
    border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens._ctrlMenuPopoverStrokeFlyout}`,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    ...createSlideStyles(10),
  },
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useSemanticMenuPopoverStyles = (_state: unknown): MenuPopoverState => {
  'use no memo';

  const state = _state as MenuPopoverState;
  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    menuPopoverClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );
  return state;
};
