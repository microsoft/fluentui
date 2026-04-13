import { makeStyles, mergeClasses } from '@griffel/react';
import { teachingPopoverBodyClassNames, type TeachingPopoverBodyState } from '@fluentui/react-teaching-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const popoverBodyDimension = 288;

export const useMediaStyles = makeStyles({
  base: {
    gridArea: 'media',
    overflow: 'hidden',
    width: 'auto',
    marginBottom: '12px',
    verticalAlign: 'middle',
    justifyContent: 'center',
    display: 'flex',
  },
  short: {
    aspectRatio: popoverBodyDimension / 117,
    '@supports not (aspect-ratio)': {
      height: '117px',
    },
  },
  medium: {
    aspectRatio: popoverBodyDimension / 176,
    '@supports not (aspect-ratio)': {
      height: '176px',
    },
  },
  tall: {
    aspectRatio: 1,
    '@supports not (aspect-ratio)': {
      height: `${popoverBodyDimension}px`,
    },
  },
});

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '12px',
  },
});

/** Applies style classnames to slots */
export const useSemanticTeachingPopoverBodyStyles = (_state: unknown) => {
  'use no memo';

  const state = _state as TeachingPopoverBodyState;

  const { mediaLength } = state;
  const styles = useStyles();
  const mediaStyles = useMediaStyles();

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverBodyClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.media) {
    state.media.className = mergeClasses(
      state.media.className,
      teachingPopoverBodyClassNames.media,
      mediaStyles.base,
      mediaStyles[mediaLength],
      getSlotClassNameProp_unstable(state.media),
    );
  }

  return state;
};
