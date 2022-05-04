import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ImageSlots, ImageState } from './Image.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `imageClassNames.root` instead.
 */
export const imageClassName = 'fui-Image';
export const imageClassNames: SlotClassNames<ImageSlots> = {
  root: 'fui-Image',
};

const useStyles = makeStyles({
  root: {
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ...shorthands.borderRadius(tokens.borderRadiusNone),

    boxSizing: 'border-box',
    display: 'inline-block',
  },
  rootBordered: {
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),
  },
  rootCircular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  rootRounded: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  rootShadow: {
    boxShadow: tokens.shadow4,
  },
  rootFitNone: {
    objectFit: 'none',
    objectPosition: 'left top',
    height: '100%',
    width: '100%',
  },
  rootFitCenter: {
    objectFit: 'none',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  rootFitCover: {
    objectFit: 'cover',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  rootFitContain: {
    objectFit: 'contain',
    objectPosition: 'center',
    height: '100%',
    width: '100%',
  },
  rootBlock: {
    width: '100%',
  },
});

export const useImageStyles_unstable = (state: ImageState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    imageClassNames.root,
    styles.root,
    state.bordered && styles.rootBordered,
    state.shape === 'circular' && styles.rootCircular,
    state.shape === 'rounded' && styles.rootRounded,
    state.shadow && styles.rootShadow,
    state.fit === 'none' && styles.rootFitNone,
    state.fit === 'center' && styles.rootFitCenter,
    state.fit === 'cover' && styles.rootFitCover,
    state.fit === 'contain' && styles.rootFitContain,
    state.block && styles.rootBlock,
    state.root.className,
  );
};
