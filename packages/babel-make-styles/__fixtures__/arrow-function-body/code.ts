import { makeStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

function buttonTokens(theme: Theme) {
  return {
    backgroundColor: theme.global.color.black,
    backgroundColorHover: 'red',
    color: theme.alias.color.blue.border2,
  };
}

export const useStyles = makeStyles({
  root: theme => {
    const tokens = buttonTokens(theme);

    return {
      backgroundColor: tokens.backgroundColor,
      color: tokens.color,
      display: 'flex',

      ':hover': { color: tokens.backgroundColorHover },
    };
  },
});
