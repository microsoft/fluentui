import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagButtonSlots, TagButtonState } from './TagButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { useResetButtonStyles, useTagBaseStyles } from '../Tag/index';

export const tagButtonClassNames: SlotClassNames<TagButtonSlots> = {
  root: 'fui-TagButton',
  content: 'fui-TagButton__content',
  media: 'fui-TagButton__media',
  icon: 'fui-TagButton__icon',
  primaryText: 'fui-TagButton__primaryText',
  secondaryText: 'fui-TagButton__secondaryText',
  dismissButton: 'fui-TagButton__dismissButton',
};

const useStyles = makeStyles({
  root: {
    // TODO use makeResetStyle when styles are settled
    display: 'inline-flex',

    boxSizing: 'border-box',
    height: '32px',
    width: 'fit-content',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
  },
  rootCircular: shorthands.borderRadius(tokens.borderRadiusCircular),

  content: {
    display: 'inline-grid',
    gridTemplateRows: '1fr auto auto 1fr',
    gridTemplateAreas: `
    "media .        "
    "media primary  "
    "media secondary"
    "media .        "
    `,
    paddingRight: tokens.spacingHorizontalS,

    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
        zIndex: 1,
      },
      { enableOutline: true },
    ),

    ':hover': {
      cursor: 'pointer',
    },
  },
  circularContent: createCustomFocusIndicatorStyle(shorthands.borderRadius(tokens.borderRadiusCircular)),
  contentWithoutMedia: {
    paddingLeft: tokens.spacingHorizontalS,
  },
  dismissibleContent: createCustomFocusIndicatorStyle({
    borderTopRightRadius: tokens.borderRadiusNone,
    borderBottomRightRadius: tokens.borderRadiusNone,
  }),

  dismissButton: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    paddingLeft: '6px',
    paddingRight: '6px',

    ...shorthands.borderLeft(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),

    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      borderTopLeftRadius: tokens.borderRadiusNone,
      borderBottomLeftRadius: tokens.borderRadiusNone,
      borderTopRightRadius: tokens.borderRadiusMedium,
      borderBottomRightRadius: tokens.borderRadiusMedium,
    }),

    ':hover': {
      cursor: 'pointer',
    },
  },
  dismissButtonCircular: createCustomFocusIndicatorStyle({
    borderTopRightRadius: tokens.borderRadiusCircular,
    borderBottomRightRadius: tokens.borderRadiusCircular,
  }),

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

const useSmallTagButtonStyles = makeStyles({
  root: {
    height: '24px',
  },
  // TODO add additional styles for sizes
});

/**
 * Apply styling to the TagButton slots based on the state
 */
export const useTagButtonStyles_unstable = (state: TagButtonState): TagButtonState => {
  const baseStyles = useTagBaseStyles();
  const resetButtonStyles = useResetButtonStyles();
  const styles = useStyles();
  const smallStyles = useSmallTagButtonStyles();

  state.root.className = mergeClasses(
    tagButtonClassNames.root,
    styles.root,
    state.shape === 'circular' && styles.rootCircular,

    state.size === 'small' && smallStyles.root,

    state.root.className,
  );
  if (state.content) {
    state.content.className = mergeClasses(
      tagButtonClassNames.content,

      resetButtonStyles.resetButton,
      styles.content,
      state.shape === 'circular' && styles.circularContent,
      !state.media && !state.icon && styles.contentWithoutMedia,
      state.dismissible && styles.dismissibleContent,

      state.content.className,
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(tagButtonClassNames.media, baseStyles.media, state.media.className);
  }
  if (state.icon) {
    state.icon.className = mergeClasses(tagButtonClassNames.icon, baseStyles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagButtonClassNames.primaryText,
      baseStyles.primaryText,
      state.secondaryText && baseStyles.primaryTextWithSecondaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagButtonClassNames.secondaryText,
      baseStyles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      tagButtonClassNames.dismissButton,
      resetButtonStyles.resetButton,

      styles.dismissButton,
      state.shape === 'circular' && styles.dismissButtonCircular,
      state.dismissButton.className,
    );
  }

  return state;
};
