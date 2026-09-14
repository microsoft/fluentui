import { makeStyles, tokens } from '@fluentui/react-components';

export const usePreviewStyles = makeStyles({
  root: {
    position: 'relative',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  frame: {
    width: '100%',
    height: '100%',
    border: 0,
    display: 'block',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  placeholder: {
    position: 'absolute',
    inset: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});
