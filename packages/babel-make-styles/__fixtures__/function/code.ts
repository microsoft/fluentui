import { makeStyles } from '@fluentui/react-make-styles';

export const useStyles = makeStyles({
  root: function (theme) {
    return {
      backgroundColor: theme.global.color.black,
      color: theme.alias.color.blue.border2,
      display: 'flex',
    };
  },
  rootPrimary: function (theme) {
    return { color: theme.alias.color.neutral.brandBackground };
  },
});
