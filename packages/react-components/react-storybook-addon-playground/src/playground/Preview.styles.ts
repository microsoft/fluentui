import { makeStyles, tokens } from '@fluentui/react-components';

export const usePreviewStyles = makeStyles({
  root: {
    height: '100%',
    minHeight: 0,
    overflow: 'auto',
    boxSizing: 'border-box',
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});
