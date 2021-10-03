import { Theme } from '@fluentui/react-theme';
const react_make_styles_1 = require('@fluentui/react-make-styles');

const useStyles = react_make_styles_1.makeStyles({
  root: function (theme: Theme) {
    return {
      fontSize: theme.fontSizeBase300,
      lineHeight: theme.lineHeightBase300,
      fontWeight: theme.fontWeightRegular,
    };
  },
});

console.log(useStyles);
