import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  content: 'fui-Tag__content',
  media: 'fui-Tag__media',
  icon: 'fui-Tag__icon',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
  dismissButton: 'fui-Tag__dismissButton',
};

/**
 * Styles for the root slot
 */
export const useTagBaseStyles = makeStyles({
  root: {
    // TODO use makeResetStyle when styles are settled
    display: 'inline-flex',
    height: '32px',
    width: 'fit-content',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
  },
  rootCircular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },

  media: {
    ...shorthands.gridArea('media'),
    alignSelf: 'center',
    paddingLeft: tokens.spacingHorizontalXXS,
    paddingRight: tokens.spacingHorizontalS,
  },

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
  },
  textOnlyContent: {
    paddingLeft: tokens.spacingHorizontalS,
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

  resetButton: {
    boxSizing: 'content-box',
    color: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    appearance: 'button',
    textAlign: 'unset',
  },
  dismissButton: {
    ...shorthands.padding('0px'),
    backgroundColor: 'transparent',
    width: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',

    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      },
      { enableOutline: true },
    ),
  },

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

const useTagStyles = makeStyles({
  dismissibleContent: {
    paddingRight: '2px',
  },
  dismissButton: {
    marginRight: '6px',
  },
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const baseStyles = useTagBaseStyles();
  const styles = useTagStyles();

  state.root.className = mergeClasses(
    tagClassNames.root,
    baseStyles.root,
    state.shape === 'circular' && baseStyles.rootCircular,
    state.root.className,
  );
  if (state.content) {
    state.content.className = mergeClasses(
      tagClassNames.content,
      baseStyles.content,
      !state.media && !state.icon && baseStyles.textOnlyContent,

      state.dismissButton && styles.dismissibleContent,
      state.content.className,
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(tagClassNames.media, baseStyles.media, state.media.className);
  }
  if (state.icon) {
    state.icon.className = mergeClasses(tagClassNames.icon, baseStyles.icon, state.icon.className);
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,
      baseStyles.primaryText,
      state.secondaryText && baseStyles.primaryTextWithSecondaryText,
      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagClassNames.secondaryText,
      baseStyles.secondaryText,
      state.secondaryText.className,
    );
  }
  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      tagClassNames.dismissButton,
      baseStyles.resetButton,
      baseStyles.dismissButton,

      styles.dismissButton,
      state.dismissButton.className,
    );
  }

  return state;
};
