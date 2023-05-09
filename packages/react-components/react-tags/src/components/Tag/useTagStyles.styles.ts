import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
  content: 'fui-Tag__content',
  dismissButton: 'fui-Tag__dismissButton',
  icon: 'fui-Tag__icon',
  media: 'fui-Tag__media',
  primaryText: 'fui-Tag__primaryText',
  secondaryText: 'fui-Tag__secondaryText',
};

export const useTagStyles = makeStyles({
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
  nonInteractiveDismissibleContent: {
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
  nonInteractiveDismissButton: {
    marginRight: '6px',
  },

  // TODO add additional classes for fill/outline appearance, different sizes, and state
});

const useInteractiveTagStyles = makeStyles({
  content: {
    position: 'relative',
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    }),
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
});

/**
 * Apply styling to the Tag slots based on the state
 */
export const useTagStyles_unstable = (state: TagState): TagState => {
  const styles = useTagStyles();
  const interactiveTagStyles = useInteractiveTagStyles();

  state.root.className = mergeClasses(
    tagClassNames.root,
    styles.root,
    state.shape === 'circular' && styles.rootCircular,
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(
      tagClassNames.content,
      state.interactive && styles.resetButton,

      styles.content,
      !state.media && !state.icon && styles.textOnlyContent,

      !state.interactive && state.dismissible && styles.nonInteractiveDismissibleContent,

      state.interactive && interactiveTagStyles.content,
      state.interactive && state.shape === 'circular' && interactiveTagStyles.circularContent,
      state.interactive && state.dismissible && interactiveTagStyles.dismissibleContent,

      state.content.className,
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(tagClassNames.media, styles.media, state.media.className);
  }

  if (state.icon) {
    state.icon.className = mergeClasses(tagClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      tagClassNames.primaryText,
      styles.primaryText,
      state.secondaryText && styles.primaryTextWithSecondaryText,
      state.primaryText.className,
    );
  }

  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      tagClassNames.secondaryText,
      styles.secondaryText,
      state.secondaryText.className,
    );
  }

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      tagClassNames.dismissButton,
      styles.resetButton,
      styles.dismissButton,

      !state.interactive && styles.nonInteractiveDismissButton,

      state.interactive && interactiveTagStyles.dismissButton,
      state.interactive && state.shape === 'circular' && interactiveTagStyles.dismissButtonCircular,

      state.dismissButton.className,
    );
  }

  return state;
};
