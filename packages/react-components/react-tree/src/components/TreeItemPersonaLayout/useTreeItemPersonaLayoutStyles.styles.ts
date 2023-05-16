import type { TreeItemPersonaLayoutSlots, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { treeItemLevelToken } from '../../utils/tokens';
import { useTreeItemContext_unstable } from '../../contexts/treeItemContext';

export const treeItemPersonaLayoutClassNames: SlotClassNames<TreeItemPersonaLayoutSlots> = {
  root: 'fui-TreeItemPersonaLayout',
  expandIcon: 'fui-TreeItemPersonaLayout__expandIcon',
  media: 'fui-TreeItemPersonaLayout__media',
  content: 'fui-TreeItemPersonaLayout__content',
  description: 'fui-TreeItemPersonaLayout__description',
  main: 'fui-TreeItemPersonaLayout__main',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'flex',
    alignItems: 'center',
    ...typographyStyles.body1,
    ...shorthands.gridArea('layout'),
    ':active': {
      color: tokens.colorNeutralForeground2Pressed,
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      // TODO: stop using treeItemClassNames.expandIcon for styling
      [`& .${treeItemPersonaLayoutClassNames.expandIcon}`]: {
        color: tokens.colorNeutralForeground3Pressed,
      },
    },
    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: tokens.colorSubtleBackgroundHover,
      // TODO: stop using treeItemClassNames.expandIcon  for styling
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
    ...shorthands.padding(0, tokens.spacingHorizontalXS, 0, tokens.spacingHorizontalXXS),
  },
});

const useContentStyles = makeStyles({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalXS,
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalS,
    ),
    ...shorthands.gap(tokens.spacingVerticalNone, tokens.spacingHorizontalNone),
  },
});

const useDescriptionStyles = makeStyles({
  base: {
    ...typographyStyles.caption1,
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
  const contentStyles = useContentStyles();
  const descriptionStyles = useDescriptionStyles();
  const expandIconStyles = useExpandIconStyles();

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
      state.content.className,
    );
  }
  if (state.main) {
    state.main.className = mergeClasses(treeItemPersonaLayoutClassNames.main, state.main.className);
  }
  if (state.description) {
    state.description.className = mergeClasses(
      treeItemPersonaLayoutClassNames.description,
      descriptionStyles.base,
      state.description.className,
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
