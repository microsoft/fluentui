import { makeStyles, mergeClasses } from '@griffel/react';
import type { TeachingPopoverBodySlots, TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverBodyClassNames: SlotClassNames<TeachingPopoverBodySlots> = {
  root: 'fui-TeachingPopoverBody',
  media: 'fui-TeachingPopoverBody__media',
};

const popoverBodyDimension = 288;

export const useMediaStyles = makeStyles({
  base: {
    gridArea: 'media',
    overflow: 'hidden',
    width: `${popoverBodyDimension}px`,
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
    aspectRatio: popoverBodyDimension / popoverBodyDimension,
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
export const useTeachingPopoverBodyStyles_unstable = (state: TeachingPopoverBodyState) => {
  'use no memo';

  const { mediaLength } = state;
  const styles = useStyles();
  const mediaStyles = useMediaStyles();

  state.root.className = mergeClasses(teachingPopoverBodyClassNames.root, styles.root, state.root.className);

  if (state.media) {
    state.media.className = mergeClasses(
      teachingPopoverBodyClassNames.media,
      mediaStyles.base,
      mediaStyles[mediaLength],
      state.media.className,
    );
  }

  return state;
};
