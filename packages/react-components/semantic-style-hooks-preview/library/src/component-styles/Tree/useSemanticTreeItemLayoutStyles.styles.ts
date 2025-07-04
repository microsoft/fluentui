import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
  type TreeItemLayoutState,
  useTreeContext_unstable,
  treeItemLevelToken,
  useTreeItemContext_unstable,
  treeItemLayoutClassNames,
} from '@fluentui/react-tree';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  minHeight: '32px',
  boxSizing: 'border-box',
  gridArea: 'layout',
  ':active': {
    color: semanticTokens.foregroundCtrlOnSubtlePressed,
    backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
    // TODO: stop using treeItemLayoutClassNames.expandIcon for styling
    [`& .${treeItemLayoutClassNames.expandIcon}`]: {
      color: semanticTokens._ctrlTreeIconOnSubtlePressed,
    },
  },
  ':hover': {
    color: semanticTokens.foregroundCtrlOnSubtleHover,
    backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
    // TODO: stop using treeItemLayoutClassNames.expandIcon  for styling
    [`& .${treeItemLayoutClassNames.expandIcon}`]: {
      color: semanticTokens._ctrlTreeIconOnSubtleHover,
    },
  },
});

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  leaf: {
    paddingLeft: `calc(var(${treeItemLevelToken}, 1) * ${semanticTokens.ctrlListIndentLevel1})`,
  },
  branch: {
    paddingLeft: `calc((var(${treeItemLevelToken}, 1) - 1) * ${semanticTokens.ctrlListIndentLevel1})`,
  },
  medium: {
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
  },
  small: {
    minHeight: '24px',
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampSmItemBodyFontSize,
    lineHeight: semanticTokens.textRampSmItemBodyLineHeight,
  },
  // Appearance variations
  subtle: {},
  'subtle-alpha': {
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundLightAlphaHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundLightAlphaPressed,
    },
  },
  transparent: {
    backgroundColor: semanticTokens.nullColor,
    color: semanticTokens.foregroundCtrlOnTransparentRest,
    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      color: semanticTokens._ctrlTreeOnTransparentHover,
    },
    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      color: semanticTokens._ctrlTreeOnTransparentPressed,
    },
  },
});

/**
 * Styles for the action icon slot
 */
const useActionsBaseStyles = makeResetStyles({
  display: 'flex',
  marginLeft: 'auto',
  position: 'relative',
  zIndex: 1,
  gridArea: 'aside',
  padding: `0 ${tokens.spacingHorizontalS}`,
});
/**
 * Styles for the action icon slot
 */
const useAsideBaseStyles = makeResetStyles({
  display: 'flex',
  marginLeft: 'auto',
  alignItems: 'center',
  zIndex: 0,
  gridArea: 'aside',
  padding: `0 ${tokens.spacingHorizontalM}`,
  gap: tokens.spacingHorizontalXS,
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '24px',
  boxSizing: 'border-box',
  color: semanticTokens._ctrlTreeIconOnSubtle,
  flex: `0 0 auto`,
  padding: `${tokens.spacingVerticalXS} 0`,
});

/**
 * Styles for the content slot
 */
const useMainBaseStyles = makeResetStyles({
  // padding: `0 ${tokens.spacingHorizontalXXS}`,
  padding: `${semanticTokens._ctrlTreePaddingTextTop} ${semanticTokens._ctrlTreePaddingTextRight} ${semanticTokens._ctrlTreePaddingTextBottom} ${semanticTokens._ctrlTreePaddingTextLeft}`,
});

/**
 * Styles for the before/after icon slot
 */
const useIconBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: semanticTokens.foregroundCtrlOnSubtleRest,
  lineHeight: semanticTokens.textGlobalBody1LineHeight,
  fontSize: semanticTokens.textGlobalBody1FontSize,
});

const useIconBeforeStyles = makeStyles({
  medium: {
    paddingRight: tokens.spacingHorizontalXS,
  },
  small: {
    paddingRight: tokens.spacingHorizontalXXS,
  },
});

const useIconAfterStyles = makeStyles({
  medium: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  small: {
    paddingLeft: tokens.spacingHorizontalXXS,
  },
});

/**
 * Apply styling to the TreeItemLayout slots based on the state
 */
export const useSemanticTreeItemLayoutStyles = (_state: unknown): TreeItemLayoutState => {
  'use no memo';

  const state = _state as TreeItemLayoutState;
  const { main, iconAfter, iconBefore, expandIcon, root, aside, actions, selector } = state;
  const rootStyles = useRootStyles();
  const rootBaseStyles = useRootBaseStyles();
  const actionsBaseStyles = useActionsBaseStyles();
  const asideBaseStyles = useAsideBaseStyles();

  const mainBaseStyles = useMainBaseStyles();

  const expandIconBaseStyles = useExpandIconBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const iconBeforeStyles = useIconBeforeStyles();
  const iconAfterStyles = useIconAfterStyles();

  const size = useTreeContext_unstable(ctx => ctx.size);
  const appearance = useTreeContext_unstable(ctx => ctx.appearance);
  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  root.className = mergeClasses(
    treeItemLayoutClassNames.root,
    rootBaseStyles,
    rootStyles[appearance],
    rootStyles[size],
    rootStyles[itemType],
    root.className,
    getSlotClassNameProp_unstable(root),
  );

  main.className = mergeClasses(treeItemLayoutClassNames.main, mainBaseStyles, main.className);

  if (expandIcon) {
    expandIcon.className = mergeClasses(
      treeItemLayoutClassNames.expandIcon,
      expandIconBaseStyles,
      expandIcon.className,
      getSlotClassNameProp_unstable(expandIcon),
    );
  }

  if (iconBefore) {
    iconBefore.className = mergeClasses(
      treeItemLayoutClassNames.iconBefore,
      iconBaseStyles,
      iconBeforeStyles[size],
      iconBefore.className,
      getSlotClassNameProp_unstable(iconBefore),
    );
  }

  if (iconAfter) {
    iconAfter.className = mergeClasses(
      treeItemLayoutClassNames.iconAfter,
      iconBaseStyles,
      iconAfterStyles[size],
      iconAfter.className,
      getSlotClassNameProp_unstable(iconAfter),
    );
  }

  if (actions) {
    actions.className = mergeClasses(
      treeItemLayoutClassNames.actions,
      actionsBaseStyles,
      actions.className,
      getSlotClassNameProp_unstable(actions),
    );
  }
  if (aside) {
    aside.className = mergeClasses(
      treeItemLayoutClassNames.aside,
      asideBaseStyles,
      aside.className,
      getSlotClassNameProp_unstable(aside),
    );
  }
  if (selector) {
    selector.className = mergeClasses(
      treeItemLayoutClassNames.selector,
      selector.className,
      getSlotClassNameProp_unstable(selector),
    );
  }

  return state;
};
