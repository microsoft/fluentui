import { Theme } from '@fluentui/react-theme';
const react_make_styles_1 = require('@fluentui/react-make-styles');

const useStyles = react_make_styles_1.makeStyles({
  root: function (theme: Theme) {
    return {
      fontSize: theme.global.type.fontSizes.base[300],
      lineHeight: theme.global.type.lineHeights.base[300],
      fontWeight: theme.global.type.fontWeights.regular,
    };
  },
});

console.log(useStyles);
