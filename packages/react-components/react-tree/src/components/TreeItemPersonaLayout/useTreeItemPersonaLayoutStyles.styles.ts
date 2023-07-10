import type { TreeItemPersonaLayoutSlots, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { treeItemLevelToken } from '../../utils/tokens';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

export const treeItemPersonaLayoutClassNames: SlotClassNames<TreeItemPersonaLayoutSlots> = {
  root: 'fui-TreeItemPersonaLayout',
  media: 'fui-TreeItemPersonaLayout__media',
  description: 'fui-TreeItemPersonaLayout__description',
  content: 'fui-TreeItemPersonaLayout__content',
  expandIcon: 'fui-TreeItemPersonaLayout__expandIcon',
  aside: 'fui-TreeItemPersonaLayout__aside',
  actions: 'fui-TreeItemPersonaLayout__actions',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gridTemplateColumns: 'auto auto 1fr auto',
    gridTemplateAreas: `
      "expandIcon media content        aside"
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
  },
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
const useMediaStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '32px',
    height: '32px',
    ...shorthands.gridArea('media'),
    ...shorthands.padding(0, tokens.spacingHorizontalXS, 0, tokens.spacingHorizontalXXS),
  },
});

const useContentStyles = makeStyles({
  base: {
    ...shorthands.gridArea('content'),
    ...shorthands.padding(
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalXS,
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalS,
    ),
  },
  withDescription: {
    ...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalXS, 0, tokens.spacingHorizontalS),
  },
});

const useDescriptionStyles = makeStyles({
  base: {
    ...shorthands.gridArea('description'),
    ...typographyStyles.caption1,
    ...shorthands.padding(0, tokens.spacingHorizontalXS, tokens.spacingVerticalMNudge, tokens.spacingHorizontalS),
  },
});

/**
 * Styles for the action icon slot
 */
const useActionsStyles = makeStyles({
  base: {
    display: 'flex',
    marginLeft: 'auto',
    position: 'relative',
    zIndex: 1,
    ...shorthands.gridArea('aside'),
    ...shorthands.padding(0, tokens.spacingHorizontalS),
  },
});
/**
 * Styles for the action icon slot
 */
const useAsideStyles = makeStyles({
  base: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    zIndex: 0,
    ...shorthands.gridArea('aside'),
    ...shorthands.padding(0, tokens.spacingHorizontalM),
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

/**
 * Styles for the expand icon slot
 */
const useExpandIconStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground3,
    ...shorthands.gridArea('expandIcon'),
    ...shorthands.flex(0, 0, 'auto'),
    ...shorthands.padding(tokens.spacingVerticalXS, 0),
  },
});

/**
 * Apply styling to the TreeItemPersonaLayout slots based on the state
 */
export const useTreeItemPersonaLayoutStyles_unstable = (
  state: TreeItemPersonaLayoutState,
): TreeItemPersonaLayoutState => {
  const rootStyles = useRootStyles();
  const mediaStyles = useMediaStyles();
  const descriptionStyles = useDescriptionStyles();
  const actionsStyles = useActionsStyles();
  const asideStyles = useAsideStyles();
  const expandIconStyles = useExpandIconStyles();
  const contentStyles = useContentStyles();

  const itemType = useTreeItemContext_unstable(ctx => ctx.itemType);

  state.root.className = mergeClasses(
    treeItemPersonaLayoutClassNames.root,
    rootStyles.base,
    rootStyles[itemType],
    state.root.className,
  );

  state.media.className = mergeClasses(treeItemPersonaLayoutClassNames.media, mediaStyles.base, state.media.className);

  if (state.content) {
    state.content.className = mergeClasses(
      treeItemPersonaLayoutClassNames.content,
      contentStyles.base,
      state.description && contentStyles.withDescription,
      state.content.className,
    );
  }
  if (state.description) {
    state.description.className = mergeClasses(
      treeItemPersonaLayoutClassNames.description,
      descriptionStyles.base,
      state.description.className,
    );
  }
  if (state.actions) {
    state.actions.className = mergeClasses(
      treeItemPersonaLayoutClassNames.actions,
      actionsStyles.base,
      state.actions.className,
    );
  }
  if (state.aside) {
    state.aside.className = mergeClasses(
      treeItemPersonaLayoutClassNames.aside,
      asideStyles.base,
      state.aside.className,
    );
  }
  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(
      treeItemPersonaLayoutClassNames.expandIcon,
      expandIconStyles.base,
      state.expandIcon.className,
    );
  }

  return state;
};
