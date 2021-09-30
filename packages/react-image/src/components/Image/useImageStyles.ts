import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { ImageState } from './Image.types';

const useStyles = makeStyles({
  root: theme => ({
    borderColor: theme.colorNeutralStroke1,
    borderRadius: theme.borderRadiusNone,

    boxSizing: 'border-box',
    display: 'inline-block',
  }),
  rootBordered: theme => ({
    borderStyle: 'solid',
    borderWidth: theme.strokeWidthThin,
  }),
  rootCircular: theme => ({
    borderRadius: theme.borderRadiusCircular,
  }),
  rootRounded: theme => ({
    borderRadius: theme.borderRadiusMedium,
  }),
  rootShadow: theme => ({
    boxShadow: theme.shadowLevelShadow4,
  }),
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

export const useImageStyles = (state: ImageState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
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
