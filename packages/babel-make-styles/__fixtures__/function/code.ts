import { makeStyles } from '@fluentui/react-make-styles';

export const useStyles = makeStyles({
  root: function (theme) {
    return {
      backgroundColor: 'black',
      color: theme.colorPaletteBlueBorder2,
      display: 'flex',
    };
  },
  rootPrimary: function (theme) {
    return { color: theme.colorBrandBackground };
  },
});
