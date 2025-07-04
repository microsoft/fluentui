import {
  treeItemLevelToken,
  treeItemPersonaLayoutClassNames,
  useTreeItemContext_unstable,
  type TreeItemPersonaLayoutState,
} from '@fluentui/react-tree';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootBaseStyles = makeResetStyles({
  display: 'grid',
  gridTemplateRows: '1fr auto',
  gridTemplateColumns: 'auto auto 1fr auto',
  gridTemplateAreas: `
    "expandIcon media main        aside"
    "expandIcon media description aside"
  `,
  alignItems: 'center',
  ...typographyStyles.body1,
  ':active': {
    color: semanticTokens.foregroundCtrlOnSubtlePressed,
    backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
    // TODO: stop using treeItemPersonaLayoutClassNames.expandIcon for styling
    [`& .${treeItemPersonaLayoutClassNames.expandIcon}`]: {
      color: semanticTokens._ctrlPersonaTreeIconOnSubtlePressed,
    },
  },
  ':hover': {
    color: semanticTokens.foregroundCtrlOnSubtleHover,
    backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
    // TODO: stop using treeItemPersonaLayoutClassNames.expandIcon  for styling
    [`& .${treeItemPersonaLayoutClassNames.expandIcon}`]: {
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
});

/**
 * Styles for the expand icon slot
 */
const useMediaBaseStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  gridArea: 'media',
  padding: `0 ${tokens.spacingHorizontalXS} 0 ${tokens.spacingHorizontalXXS}`,
});

const useMainBaseStyles = makeResetStyles({
  gridArea: 'main',
  padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalXS} ${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalS}`,
});

const useMainStyles = makeStyles({
  withDescription: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalXS} 0 ${tokens.spacingHorizontalS}`,
  },
});

const useDescriptionBaseStyles = makeResetStyles({
  gridArea: 'description',
  ...typographyStyles.caption1,
  padding: `0 ${tokens.spacingHorizontalXS} ${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalS}`,
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
  gridArea: 'expandIcon',
  flex: `0 0 auto`,
  padding: `${tokens.spacingVerticalXS} 0`,
});

/**
 * Apply styling to the TreeItemPersonaLayout slots based on the state
 */
export const useSemanticTreeItemPersonaLayoutStyles = (_state: unknown): TreeItemPersonaLayoutState => {
  'use no memo';

  const state = _state as TreeItemPersonaLayoutState;
  const rootBaseStyles = useRootBaseStyles();
  const rootStyles = useRootStyles();
  const mediaBaseStyles = useMediaBaseStyles();
  const descriptionBaseStyles = useDescriptionBaseStyles();
  const actionsBaseStyles = useActionsBaseStyles();
  const asideBaseStyles = useAsideBaseStyles();
  const expandIconBaseStyles = useExpandIconBaseStyles();
  const mainBaseStyles = useMainBaseStyles();
  const mainStyles = useMainStyles();

  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  state.root.className = mergeClasses(
    state.root.className,
    treeItemPersonaLayoutClassNames.root,
    rootBaseStyles,
    rootStyles[itemType],
    getSlotClassNameProp_unstable(state.root),
  );

  state.media.className = mergeClasses(
    state.media.className,
    treeItemPersonaLayoutClassNames.media,
    mediaBaseStyles,
    getSlotClassNameProp_unstable(state.media),
  );

  if (state.main) {
    state.main.className = mergeClasses(
      state.main.className,
      treeItemPersonaLayoutClassNames.main,
      mainBaseStyles,
      state.description && mainStyles.withDescription,
      getSlotClassNameProp_unstable(state.main),
    );
  }
  if (state.description) {
    state.description.className = mergeClasses(
      state.description.className,
      treeItemPersonaLayoutClassNames.description,
      descriptionBaseStyles,
      getSlotClassNameProp_unstable(state.description),
    );
  }
  if (state.actions) {
    state.actions.className = mergeClasses(
      state.actions.className,
      treeItemPersonaLayoutClassNames.actions,
      actionsBaseStyles,
      getSlotClassNameProp_unstable(state.actions),
    );
  }
  if (state.aside) {
    state.aside.className = mergeClasses(
      state.aside.className,
      treeItemPersonaLayoutClassNames.aside,
      asideBaseStyles,
      getSlotClassNameProp_unstable(state.aside),
    );
  }
  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      state.expandIcon.className,
      treeItemPersonaLayoutClassNames.expandIcon,
      expandIconBaseStyles,
      getSlotClassNameProp_unstable(state.expandIcon),
    );
  }

  if (state.selector) {
    state.selector.className = mergeClasses(
      state.selector.className,
      treeItemPersonaLayoutClassNames.selector,
      getSlotClassNameProp_unstable(state.selector),
    );
  }

  return state;
};
