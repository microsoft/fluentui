import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createSlideStyles } from '@fluentui/react-positioning';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = {
  root: 'fui-MenuPopover',
};

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
export const useMenuPopoverStyles_unstable = (state: MenuPopoverState): MenuPopoverState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(menuPopoverClassNames.root, styles.root, state.root.className);
  return state;
};
