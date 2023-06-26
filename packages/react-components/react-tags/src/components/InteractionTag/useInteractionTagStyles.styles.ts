import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InteractionTagSlots, InteractionTagState } from './InteractionTag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import {
  useIconStyles,
  useMediaStyles,
  usePrimaryTextStyles,
  useSecondaryTextStyles,
} from '../Tag/useTagStyles.styles';

export const interactionTagClassNames: SlotClassNames<InteractionTagSlots> = {
  root: 'fui-InteractionTag',
  content: 'fui-InteractionTag__content',
  media: 'fui-InteractionTag__media',
  icon: 'fui-InteractionTag__icon',
  primaryText: 'fui-InteractionTag__primaryText',
  secondaryText: 'fui-InteractionTag__secondaryText',
  dismissButton: 'fui-InteractionTag__dismissButton',
};

const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: 'fit-content',

    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
  },

  rounded: shorthands.borderRadius(tokens.borderRadiusMedium),
  circular: shorthands.borderRadius(tokens.borderRadiusCircular),

  medium: {
    height: '32px',
  },
  small: {
    height: '24px',
  },
  'extra-small': {
    height: '20px',
  },
});

const useContentButtonStyles = makeStyles({
  base: {
    // TODO use makeResetStyle when styles are settled

    // reset default button style:
    color: 'inherit',
    fontFamily: 'inherit',
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    appearance: 'button',
    textAlign: 'unset',
    backgroundColor: 'transparent',

    display: 'inline-grid',
    height: '100%',
    alignItems: 'center',
    gridTemplateAreas: `
    "media primary  "
    "media secondary"
    `,

    ':hover': {
      cursor: 'pointer',
    },
  },

  rounded: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      zIndex: 1,
    },
    { enableOutline: true },
  ),
  circular: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      zIndex: 1,
    },
    { enableOutline: true },
  ),

  medium: {
    paddingRight: '7px',
  },
  small: {
    paddingRight: '5px',
  },
  'extra-small': {
    paddingRight: '5px',
  },
});
/**
 * Styles for content slot when InteractionTag is without leading media/icon
 */
const useContentButtonWithoutMediaStyles = makeStyles({
  medium: {
    paddingLeft: '7px',
  },
  small: {
    paddingLeft: '5px',
  },
  'extra-small': {
    paddingLeft: '5px',
  },
});
/**
 * Styles for content slot when InteractionTag has dismiss button
 */
const useDismissibleContentButtonStyles = makeStyles({
  base: createCustomFocusIndicatorStyle({
    borderTopRightRadius: tokens.borderRadiusNone,
    borderBottomRightRadius: tokens.borderRadiusNone,
  }),
  medium: {
    paddingRight: tokens.spacingHorizontalS,
  },
  small: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  'extra-small': {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
});

const useDismissButtonStyles = makeStyles({
  base: {
    // reset default button style:
    color: 'inherit',
    fontFamily: 'inherit',
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    appearance: 'button',
    textAlign: 'unset',
    backgroundColor: 'transparent',

    display: 'flex',
    height: '100%',
    alignItems: 'center',

    // divider:
    ...shorthands.borderLeft(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,

    ':hover': {
      cursor: 'pointer',
    },
  },

  rounded: createCustomFocusIndicatorStyle({
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,
    borderTopRightRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
  }),
  circular: createCustomFocusIndicatorStyle({
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,
    borderTopRightRadius: tokens.borderRadiusCircular,
    borderBottomRightRadius: tokens.borderRadiusCircular,
  }),

  medium: {
    fontSize: mediumIconSize,
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  small: {
    fontSize: smallIconSize,
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  'extra-small': {
    fontSize: extraSmallIconSize,
    paddingLeft: '5px',
    paddingRight: '5px',
  },
});

/**
 * Apply styling to the InteractionTag slots based on the state
 */
export const useInteractionTagStyles_unstable = (state: InteractionTagState): InteractionTagState => {
  const rootStyles = useRootStyles();

  const contentButtonStyles = useContentButtonStyles();
  const contentButtonWithoutMediaStyles = useContentButtonWithoutMediaStyles();
  const dismissibleContentButtonStyles = useDismissibleContentButtonStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextStyles = useSecondaryTextStyles();
  const dismissButtonStyles = useDismissButtonStyles();

  const { shape, size } = state;

  state.root.className = mergeClasses(
    interactionTagClassNames.root,
    rootStyles.base,
    rootStyles[shape],
    rootStyles[size],
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(
      interactionTagClassNames.content,

      contentButtonStyles.base,
      contentButtonStyles[shape],
      contentButtonStyles[size],

      !state.media && !state.icon && contentButtonWithoutMediaStyles[size],
      state.dismissible && dismissibleContentButtonStyles.base,
      state.dismissible && dismissibleContentButtonStyles[size],

      state.content.className,
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(
      interactionTagClassNames.media,
      mediaStyles.base,
      mediaStyles[size],
      state.media.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      interactionTagClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      state.icon.className,
    );
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      interactionTagClassNames.primaryText,

      primaryTextStyles.base,
      primaryTextStyles[size],

      state.secondaryText ? primaryTextStyles.withSecondaryText : primaryTextStyles.withoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      interactionTagClassNames.secondaryText,
      secondaryTextStyles.base,
      state.secondaryText.className,
    );
  }
  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      interactionTagClassNames.dismissButton,
      dismissButtonStyles.base,
      dismissButtonStyles[shape],
      dismissButtonStyles[size],
      state.dismissButton.className,
    );
  }

  return state;
};
