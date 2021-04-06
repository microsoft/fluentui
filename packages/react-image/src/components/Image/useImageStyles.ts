import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { ImageState } from './Image.types';

const useStyles = makeStyles({
  root: theme => ({
    borderColor: theme.alias.color.neutral.neutralStroke1,
    borderRadius: theme.global.borderRadius.none,
    boxShadow: theme.alias.shadow.shadow4,

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
  rootFitNone: {
    objectFit: 'none',
    objectPosition: 'left top',
    height: '100%',
    width: '100%',

    // TODO IE 11
    // font-family: 'object-fit: none; object-position: left top;',
  },
  rootFitCenter: {
    objectFit: 'none',
    objectPosition: 'center',
    height: '100%',
    width: '100%',

    // TODO IE 11
    // font-family: 'object-fit: none; object-position: center;',
  },
  rootFitCover: {
    objectFit: 'cover',
    objectPosition: 'center',
    height: '100%',
    width: '100%',

    // TODO IE 11
    // font-family: 'object-fit: cover; object-position: center;',
  },
  rootFitContain: {
    objectFit: 'contain',
    objectPosition: 'center',
    height: '100%',
    width: '100%',

    // TODO IE 11
    // font-family: 'object-fit: contain; object-position: center;',
  },
  rootFluid: {
    width: '100%',
  },
});

export const useImageStyles = (state: ImageState) => {
  const styles = useStyles();
  state.className = useAx(
    styles.root,
    state.bordered && styles.rootBordered,
    state.circular && styles.rootCircular,
    state.rounded && styles.rootRounded,
    state.fit === 'none' && styles.rootFitNone,
    state.fit === 'center' && styles.rootFitCenter,
    state.fit === 'cover' && styles.rootFitCover,
    state.fit === 'contain' && styles.rootFitContain,
    state.fluid && styles.rootFluid,
    state.className,
  );
};
