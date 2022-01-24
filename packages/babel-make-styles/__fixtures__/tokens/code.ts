import { makeStyles } from '@fluentui/react-make-styles';
import { tokens } from '@fluentui/react-theme';

export const useStyles = makeStyles({
  root: {
    backgroundColor: 'black',
    color: tokens.colorPaletteBlueBorder2,
    display: 'flex',
  },
  rootPrimary: { color: tokens.colorBrandBackground },
});
