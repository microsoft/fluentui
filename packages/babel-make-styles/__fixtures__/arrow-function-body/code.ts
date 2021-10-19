import { makeStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

function buttonTokens(theme: Theme) {
  return {
    backgroundColor: theme.colorNeutralForeground1,
    backgroundColorHover: 'red',
    color: theme.colorPaletteBlueBorder2,
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
