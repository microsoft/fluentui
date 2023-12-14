import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverBodySlots, TeachingPopoverBodyState } from './TeachingPopoverBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverBodyClassNames: SlotClassNames<TeachingPopoverBodySlots> = {
  root: 'fui-TeachingPopoverBody',
  media: 'fui-TeachingPopoverBody__media',
};

export const useMediaStyles = makeStyles({
  base: {
    ...shorthands.gridArea('media'),
    ...shorthands.overflow('hidden'),
    width: '288px',
    marginBottom: '12px',
    verticalAlign: 'middle',
    justifyContent: 'center',
    display: 'flex',
    '& > img': {
      objectFit: 'cover',
      display: 'inline-block',
    },
  },
  short: {
    '@supports not (aspect-ratio)': {
      height: '117px',
    },
    '@supports (aspect-ratio)': {
      aspectRatio: 288 / 117,
    },
  },
  medium: {
    '@supports not (aspect-ratio)': {
      height: '176px',
    },
    '@supports (aspect-ratio)': {
      aspectRatio: 288 / 176,
    },
  },
  tall: {
    '@supports not (aspect-ratio)': {
      height: '288px',
    },
    '@supports (aspect-ratio)': {
      aspectRatio: 288 / 288,
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
  const { mediaLength = 'medium' } = state;
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
