import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagButtonSlots, TagButtonState } from './TagButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { useTagBaseStyles } from '../Tag/index';

export const tagButtonClassNames: SlotClassNames<TagButtonSlots> = {
  root: 'fui-TagButton',
  content: 'fui-TagButton__content',
  media: 'fui-TagButton__media',
  icon: 'fui-TagButton__icon',
  primaryText: 'fui-TagButton__primaryText',
  secondaryText: 'fui-TagButton__secondaryText',
  dismissButton: 'fui-TagButton__dismissButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  content: {
    position: 'relative',
    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      },
      { enableOutline: true },
    ),
  },

  circularContent: createCustomFocusIndicatorStyle(shorthands.borderRadius(tokens.borderRadiusCircular), {
    enableOutline: true,
  }),
  dismissibleContent: {
    ...createCustomFocusIndicatorStyle({
      borderTopRightRadius: tokens.borderRadiusNone,
      borderBottomRightRadius: tokens.borderRadiusNone,
    }),
  },

  dismissButton: {
    ...shorthands.padding('0px', '6px'),
    ...shorthands.borderLeft(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,
    ...createCustomFocusIndicatorStyle({
      borderTopLeftRadius: tokens.borderRadiusNone,
      borderBottomLeftRadius: tokens.borderRadiusNone,
    }),
  },
  dismissButtonCircular: createCustomFocusIndicatorStyle({
    borderTopRightRadius: tokens.borderRadiusCircular,
    borderBottomRightRadius: tokens.borderRadiusCircular,
  }),

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

/**
 * Apply styling to the TagButton slots based on the state
 */
export const useTagButtonStyles_unstable = (state: TagButtonState): TagButtonState => {
  const baseStyles = useTagBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    tagButtonClassNames.root,
    baseStyles.root,
    state.shape === 'circular' && baseStyles.rootCircular,
    state.root.className,
  );
  if (state.content) {
    state.content.className = mergeClasses(
      tagButtonClassNames.content,
      baseStyles.content,
      !state.media && !state.icon && baseStyles.textOnlyContent,

      styles.content,
      state.shape === 'circular' && styles.circularContent,
      state.dismissButton && styles.dismissibleContent,

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
      baseStyles.resetButton,
      baseStyles.dismissButton,

      styles.dismissButton,
      state.shape === 'circular' && styles.dismissButtonCircular,
      state.dismissButton.className,
    );
  }

  return state;
};
