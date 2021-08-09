import { makeStyles } from '@fluentui/react-make-styles';

export const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.global.color.black,
    color: theme.alias.color.blue.border2,
    display: 'flex',
  }),
  rootPrimary: theme => ({ color: theme.alias.color.neutral.brandBackground }),
});
