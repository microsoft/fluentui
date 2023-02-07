import type { TreeItemPersonaLayoutSlots, TreeItemPersonaLayoutState } from './TreeItemPersonaLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const treeItemPersonaLayoutClassNames: SlotClassNames<TreeItemPersonaLayoutSlots> = {
  root: 'fui-TreeItemPersonaLayout',
  media: 'fui-TreeItemPersonaLayout__media',
  content: 'fui-TreeItemPersonaLayout__content',
  description: 'fui-TreeItemPersonaLayout__description',
  aside: 'fui-TreeItemPersonaLayout__aside',
  main: 'fui-TreeItemPersonaLayout__main',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
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
    ...shorthands.padding(
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalXS,
      tokens.spacingVerticalMNudge,
      tokens.spacingHorizontalXXS,
    ),
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
const useMainStyles = makeStyles({
  base: {
    ...typographyStyles.body1,
  },
});
const useDescriptionStyles = makeStyles({
  base: {
    ...typographyStyles.caption1,
  },
});
const useAsideStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    whiteSpace: 'nowrap',
    paddingRight: tokens.spacingHorizontalS,
    ...typographyStyles.caption1,
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
  const mainStyles = useMainStyles();
  const descriptionStyles = useDescriptionStyles();
  const asideStyles = useAsideStyles();

  state.root.className = mergeClasses(treeItemPersonaLayoutClassNames.root, rootStyles.base, state.root.className);

  state.media.className = mergeClasses(treeItemPersonaLayoutClassNames.media, mediaStyles.base, state.media.className);

  if (state.content) {
    state.content.className = mergeClasses(
      treeItemPersonaLayoutClassNames.content,
      contentStyles.base,
      state.content.className,
    );
  }
  if (state.main) {
    state.main.className = mergeClasses(treeItemPersonaLayoutClassNames.main, mainStyles.base, state.main.className);
  }
  if (state.description) {
    state.description.className = mergeClasses(
      treeItemPersonaLayoutClassNames.description,
      descriptionStyles.base,
      state.description.className,
    );
  }
  if (state.aside) {
    state.aside.className = mergeClasses(
      treeItemPersonaLayoutClassNames.aside,
      asideStyles.base,
      state.aside.className,
    );
  }

  return state;
};
