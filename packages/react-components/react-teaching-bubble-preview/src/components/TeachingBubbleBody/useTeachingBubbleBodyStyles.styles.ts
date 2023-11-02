import { makeStyles, mergeClasses } from '@griffel/react';
import type { TeachingBubbleBodySlots, TeachingBubbleBodyState } from './TeachingBubbleBody.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const TeachingBubbleBodyClassNames: SlotClassNames<TeachingBubbleBodySlots> = {
  root: 'fui-TeachingBubbleBody',
  media: 'fui-TeachingBubbleBody__media',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '12px',
  },
  media: {
    width: '288px',
    objectFit: 'cover',
    marginBottom: '12px',
  },
  mediaShort: { height: '117px' },
  mediaMedium: { height: '176px' },
  mediaTall: { height: '288px' },
});

/** Applies style classnames to slots */
export const useTeachingBubbleBodyStyles_unstable = (state: TeachingBubbleBodyState) => {
  const { mediaLength } = state;
  const styles = useStyles();

  let mediaHeightStyle = styles.mediaMedium;
  switch (mediaLength) {
    case 'short':
      mediaHeightStyle = styles.mediaShort;
      break;

    case 'medium':
      mediaHeightStyle = styles.mediaMedium;
      break;

    case 'tall':
      mediaHeightStyle = styles.mediaTall;
      break;

    default:
      break;
  }

  state.root.className = mergeClasses(TeachingBubbleBodyClassNames.root, styles.root, state.root.className);

  if (state.media) {
    state.media.className = mergeClasses(
      TeachingBubbleBodyClassNames.media,
      styles.media,
      mediaHeightStyle,
      state.media.className,
    );
  }

  return state;
};
