import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagContentSlots, TagContentState } from './TagContent.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tagContentClassNames: SlotClassNames<TagContentSlots> = {
  root: 'fui-TagContent',
  media: 'fui-TagContent__media',
  icon: 'fui-TagContent__icon',
  primaryText: 'fui-TagContent__primaryText',
  secondaryText: 'fui-TagContent__secondaryText',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'inline-grid',
    gridTemplateRows: '1fr auto auto 1fr',
    gridTemplateAreas: `
    "media .        "
    "media primary  "
    "media secondary"
    "media .        "
    `,
    paddingRight: tokens.spacingHorizontalS,
  },
  textOnlyRoot: {
    paddingLeft: tokens.spacingHorizontalS,
  },
  nonInteractiveDismissableRoot: {
    paddingRight: '2px',
  },

  media: {
    ...shorthands.gridArea('media'),
    alignSelf: 'center',
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalS,
  },

  icon: {
    display: 'flex',
    alignSelf: 'center',
    ...shorthands.gridArea('media'),
    paddingLeft: '6px',
    paddingRight: '2px',
  },
  primaryText: {
    gridColumnStart: 'primary',
    gridRowStart: 'primary',
    gridRowEnd: 'secondary',
    ...typographyStyles.body1,
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
  },
  primaryTextWithSecondaryText: {
    ...shorthands.gridArea('primary'),
    ...typographyStyles.caption1,
  },
  secondaryText: {
    ...shorthands.gridArea('secondary'),
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalXXS,
    ...typographyStyles.caption2,
  },
});

/**
 * Styles for the root slot
 */
const useInteractiveTagContentStyles = makeStyles({
  resetButton: {
    boxSizing: 'content-box',
    backgroundColor: 'transparent',
    color: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    appearance: 'button',
    textAlign: 'unset',
  },
  root: {
    position: 'relative',
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    }),
  },
  circularRoot: createCustomFocusIndicatorStyle(shorthands.borderRadius(tokens.borderRadiusCircular), {
    enableOutline: true,
  }),
  dismissableRoot: {
    ...createCustomFocusIndicatorStyle({
      borderTopRightRadius: tokens.borderRadiusNone,
      borderBottomRightRadius: tokens.borderRadiusNone,
    }),
  },
});

/**
 * Apply styling to the TagContent slots based on the state
 */
export const useTagContentStyles_unstable = (state: TagContentState): TagContentState => {
  const styles = useStyles();
  const interactiveTagContentStyles = useInteractiveTagContentStyles();

  state.root.className = mergeClasses(
    tagContentClassNames.root,
    state.interactive && interactiveTagContentStyles.resetButton,

    styles.root,
    !state.media && !state.icon && styles.textOnlyRoot,

    !state.interactive && state.dismissible && styles.nonInteractiveDismissableRoot,

    state.interactive && interactiveTagContentStyles.root,
    state.interactive && state.shape === 'circular' && interactiveTagContentStyles.circularRoot,
    state.interactive && state.dismissible && interactiveTagContentStyles.dismissableRoot,

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(tagContentClassNames.media, styles.media, state.media.className);
  }

  if (state.icon) {
    state.icon.className = mergeClasses(tagContentClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagContentClassNames.primaryText,
      styles.primaryText,
      state.secondaryText && styles.primaryTextWithSecondaryText,
      state.primaryText.className,
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagContentClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }
  return state;
};
