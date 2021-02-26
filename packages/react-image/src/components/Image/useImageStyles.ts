import { makeStyles, ax } from '@fluentui/react-make-styles';
import { ImageState } from './Image.types';

export const useRootStyles = makeStyles<ImageState>([
  [
    null,
    theme => ({
      borderColor: theme.alias.color.neutral.neutralStroke1,
      borderRadius: theme.global.borderRadius.none,
      boxShadow: theme.alias.shadow.shadow4,

      boxSizing: 'border-box',
      display: 'inline-block',
    }),
  ],
  [
    props => props.bordered,
    theme => ({
      borderStyle: 'solid',
      borderWidth: theme.global.strokeWidth.thin,
    }),
  ],
  [
    props => props.circular,
    theme => ({
      borderRadius: theme.global.borderRadius.circular,
    }),
  ],
  [
    props => props.rounded,
    theme => ({
      borderRadius: theme.global.borderRadius.medium,
    }),
  ],
  [
    props => props.fit === 'none',
    {
      objectFit: 'none',
      objectPosition: 'left top',
      height: '100%',
      width: '100%',

      // TODO IE 11
      // font-family: 'object-fit: none; object-position: left top;',
    },
  ],
  [
    props => props.fit === 'center',
    {
      objectFit: 'none',
      objectPosition: 'center',
      height: '100%',
      width: '100%',

      // TODO IE 11
      // font-family: 'object-fit: none; object-position: center;',
    },
  ],
  [
    props => props.fit === 'cover',
    {
      objectFit: 'cover',
      objectPosition: 'center',
      height: '100%',
      width: '100%',

      // TODO IE 11
      // font-family: 'object-fit: cover; object-position: center;',
    },
  ],
  [
    props => props.fit === 'contain',
    {
      objectFit: 'contain',
      objectPosition: 'center',
      height: '100%',
      width: '100%',

      // TODO IE 11
      // font-family: 'object-fit: contain; object-position: center;',
    },
  ],
  [
    props => props.fluid,
    {
      width: '100%',
    },
  ],
]);

export const useImageStyles = (state: ImageState) => {
  const rootClassName = useRootStyles(state);
  state.className = ax(rootClassName, state.className);
};
