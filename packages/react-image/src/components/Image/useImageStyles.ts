import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { ImageState } from './Image.types';

const useStyles = makeStyles({
  root: theme => ({
    borderColor: theme.alias.color.neutral.neutralStroke1,
    borderRadius: theme.global.borderRadius.none,

    boxSizing: 'border-box',
    display: 'inline-block',
  }),
  rootBordered: theme => ({
    borderStyle: 'solid',
    borderWidth: theme.global.strokeWidth.thin,
  }),
  rootCircular: theme => ({
    borderRadius: theme.global.borderRadius.circular,
  }),
  rootRounded: theme => ({
    borderRadius: theme.global.borderRadius.medium,
  }),
  rootShadow: theme => ({
    boxShadow: theme.alias.shadow.shadow4,
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
  rootFluid: {
    width: '100%',
  },
});

export const useImageStyles = (state: ImageState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    state.bordered && styles.rootBordered,
    state.circular && styles.rootCircular,
    state.rounded && styles.rootRounded,
    state.shadow && styles.rootShadow,
    state.fit === 'none' && styles.rootFitNone,
    state.fit === 'center' && styles.rootFitCenter,
    state.fit === 'cover' && styles.rootFitCover,
    state.fit === 'contain' && styles.rootFitContain,
    state.fluid && styles.rootFluid,
    state.root.className,
  );
};
