import type { NavGroupSlots, NavGroupState } from './NavGroup.types';

import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const navGroupClassNames: SlotClassNames<NavGroupSlots> = {
  root: 'fui-NavGroup',
  icon: 'fui-NavGroup__icon',
  content: 'fui-NavGroup__content',
};

const reservedSpaceClassNames = {
  content: 'fui-NavGroup__content--reserved-space',
};

// These should match the constants defined in @fluentui/react-icons
// This package avoids taking a dependency on the icons package for only the constants.
const iconClassNames = {
  filled: 'fui-Icon-filled',
  regular: 'fui-Icon-regular',
};

/**
 * Styles for the root slot
 */
/* eslint-disable @typescript-eslint/naming-convention */
const useRootStyles = makeResetStyles({
  alignItems: 'center',
  ...shorthands.borderColor('none'),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  ...shorthands.borderWidth(0),
  cursor: 'pointer',
  display: 'grid',
  flexShrink: 0,
  gridAutoFlow: 'column',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto',
  fontFamily: tokens.fontFamilyBase,
  lineHeight: tokens.lineHeightBase300,
  outlineStyle: 'none',
  position: 'relative',
  ...shorthands.overflow('hidden'),
  textTransform: 'none',
});
/* eslint-enable @typescript-eslint/naming-convention */

/**
 * Focus styles for the root slot
 */
const useFocusStyles = makeStyles({
  // navGroup creates a custom focus indicator because the default focus indicator
  // is applied using an ::after pseudo-element on the root. Since the selection
  // indicator uses an ::after pseudo-element on the root, there is a conflict.
  base: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderColor('transparent'),
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: 'transparent',
      outlineStyle: 'solid',
      boxShadow: `
      ${tokens.shadow4},
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
    `,
      zIndex: 1,
    },
    { enableOutline: true },
  ),
});

/** Indicator styles for when pending selection */
const usePendingIndicatorStyles = makeStyles({
  base: {
    ':hover::before': {
      backgroundColor: tokens.colorNeutralStroke1Hover,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
      position: 'absolute',
    },
    ':active::before': {
      backgroundColor: tokens.colorNeutralStroke1Pressed,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
      position: 'absolute',
    },
    '@media (forced-colors: active)': {
      ':hover::before': {
        backgroundColor: 'Highlight',
      },
      ':active::before': {
        backgroundColor: 'Highlight',
      },
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    '::after': {
      backgroundColor: tokens.colorTransparentStroke,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
      position: 'absolute',
      zIndex: 1,
    },
  },
  selected: {
    '::after': {
      backgroundColor: tokens.colorCompoundBrandStroke,
    },
    ':hover::after': {
      backgroundColor: tokens.colorCompoundBrandStrokeHover,
    },
    ':active::after': {
      backgroundColor: tokens.colorCompoundBrandStrokePressed,
    },
    '@media (forced-colors: active)': {
      '::after': {
        backgroundColor: 'ButtonText',
      },
      ':hover::after': {
        backgroundColor: 'ButtonText',
      },
      ':active::after': {
        backgroundColor: 'ButtonText',
      },
    },
  },
});

/**
 * Styles for the icon slot.
 */
const useIconStyles = makeStyles({
  base: {
    gridColumnStart: 1,
    gridRowStart: 1,
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),
    [`& .${iconClassNames.filled}`]: {
      display: 'none',
    },
    [`& .${iconClassNames.regular}`]: {
      display: 'inline',
    },
  },
  selected: {
    [`& .${iconClassNames.filled}`]: {
      display: 'inline',
    },
    [`& .${iconClassNames.regular}`]: {
      display: 'none',
    },
  },
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  base: {
    ...typographyStyles.body1,
    ...shorthands.overflow('hidden'),
    // content padding is the same for medium & small, horizontal & vertical
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalXXS),
  },
  selected: {
    ...typographyStyles.body1Strong,
  },
  noIconBefore: {
    gridColumnStart: 1,
    gridRowStart: 1,
  },
  iconBefore: {
    gridColumnStart: 2,
    gridRowStart: 1,
  },
  placeholder: {
    visibility: 'hidden',
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useNavGroupStyles_unstable = (state: NavGroupState): NavGroupState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const pendingIndicatorStyles = usePendingIndicatorStyles();
  const activeIndicatorStyles = useActiveIndicatorStyles();
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navGroupClassNames.root,
    rootStyles,
    focusStyles.base,

    // pending indicator (before pseudo element)
    pendingIndicatorStyles.base,

    // active indicator (after pseudo element)
    selected && activeIndicatorStyles.base,
    selected && activeIndicatorStyles.selected,

    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      navGroupClassNames.icon,
      iconStyles.base,
      selected && iconStyles.selected,
      state.icon.className,
    );
  }

  // This needs to be before state.content.className is updated
  if (state.contentReservedSpace) {
    state.contentReservedSpace.className = mergeClasses(
      reservedSpaceClassNames.content,
      contentStyles.base,
      state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
      contentStyles.placeholder,
      state.content.className,
    );
  }

  state.content.className = mergeClasses(
    navGroupClassNames.content,
    contentStyles.base,
    selected && contentStyles.selected,
    state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
    state.content.className,
  );

  return state;
};
