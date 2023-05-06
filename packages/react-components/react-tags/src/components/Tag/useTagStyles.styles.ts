import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TagSlots, TagState } from './Tag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tagClassNames: SlotClassNames<TagSlots> = {
  root: 'fui-Tag',
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
  dismissButton: {
    marginRight: '6px',
  },
});

const useInteractiveTagStyles = makeStyles({
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
  const baseStyles = useTagBaseStyles();

  const tagStyles = useTagStyles();
  const interactiveTagStyles = useInteractiveTagStyles();

  state.root.className = mergeClasses(
    tagClassNames.root,
    baseStyles.root,
    state.shape === 'circular' && baseStyles.rootCircular,
    state.root.className,
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      tagClassNames.dismissButton,
      baseStyles.resetButton,
      baseStyles.dismissButton,

      !state.interactive && tagStyles.dismissButton,

      state.interactive && interactiveTagStyles.dismissButton,
      state.interactive && state.shape === 'circular' && interactiveTagStyles.dismissButtonCircular,

      state.dismissButton.className,
    );
  }

  return state;
};
