import type { TreeItemPersonaLayoutSlots, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { treeItemLevelToken } from '../../utils/tokens';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

export const treeItemPersonaLayoutClassNames: SlotClassNames<TreeItemPersonaLayoutSlots> = {
  root: 'fui-TreeItemPersonaLayout',
  media: 'fui-TreeItemPersonaLayout__media',
  description: 'fui-TreeItemPersonaLayout__description',
  main: 'fui-TreeItemPersonaLayout__main',
  expandIcon: 'fui-TreeItemPersonaLayout__expandIcon',
  aside: 'fui-TreeItemPersonaLayout__aside',
  actions: 'fui-TreeItemPersonaLayout__actions',
  selector: 'fui-TreeItemPersonaLayout__selector',
};

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
    color: tokens.colorNeutralForeground2Pressed,
    backgroundColor: tokens.colorSubtleBackgroundPressed,
    // TODO: stop using treeItemPersonaLayoutClassNames.expandIcon for styling
    [`& .${treeItemPersonaLayoutClassNames.expandIcon}`]: {
      color: tokens.colorNeutralForeground3Pressed,
    },
  },
  ':hover': {
    color: tokens.colorNeutralForeground2Hover,
    backgroundColor: tokens.colorSubtleBackgroundHover,
    // TODO: stop using treeItemPersonaLayoutClassNames.expandIcon  for styling
    [`& .${treeItemPersonaLayoutClassNames.expandIcon}`]: {
      color: tokens.colorNeutralForeground3Hover,
    },
  },
});

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  leaf: {
    paddingLeft: `calc(var(${treeItemLevelToken}, 1) * ${tokens.spacingHorizontalXXL})`,
  },
  branch: {
    paddingLeft: `calc((var(${treeItemLevelToken}, 1) - 1) * ${tokens.spacingHorizontalXXL})`,
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
  color: tokens.colorNeutralForeground3,
  gridArea: 'expandIcon',
  flex: `0 0 auto`,
  padding: `${tokens.spacingVerticalXS} 0`,
});

/**
 * Apply styling to the TreeItemPersonaLayout slots based on the state
 */
export const useTreeItemPersonaLayoutStyles_unstable = (
  state: TreeItemPersonaLayoutState,
): TreeItemPersonaLayoutState => {
  'use no memo';

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
    treeItemPersonaLayoutClassNames.root,
    rootBaseStyles,
    rootStyles[itemType],
    state.root.className,
  );

  state.media.className = mergeClasses(treeItemPersonaLayoutClassNames.media, mediaBaseStyles, state.media.className);

  if (state.main) {
    state.main.className = mergeClasses(
      treeItemPersonaLayoutClassNames.main,
      mainBaseStyles,
      state.description && mainStyles.withDescription,
      state.main.className,
    );
  }
  if (state.description) {
    state.description.className = mergeClasses(
      treeItemPersonaLayoutClassNames.description,
      descriptionBaseStyles,
      state.description.className,
    );
  }
  if (state.actions) {
    state.actions.className = mergeClasses(
      treeItemPersonaLayoutClassNames.actions,
      actionsBaseStyles,
      state.actions.className,
    );
  }
  if (state.aside) {
    state.aside.className = mergeClasses(treeItemPersonaLayoutClassNames.aside, asideBaseStyles, state.aside.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      treeItemPersonaLayoutClassNames.expandIcon,
      expandIconBaseStyles,
      state.expandIcon.className,
    );
  }

  if (state.selector) {
    state.selector.className = mergeClasses(treeItemPersonaLayoutClassNames.selector, state.selector.className);
  }

  return state;
};
