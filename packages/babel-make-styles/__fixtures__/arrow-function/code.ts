import { makeStyles } from '@fluentui/react-make-styles';

export const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.colorNeutralForeground1,
    color: theme.colorPaletteBlueBorder2,
    display: 'flex',
  }),
  rootPrimary: theme => ({ color: theme.colorBrandBackground }),
});
