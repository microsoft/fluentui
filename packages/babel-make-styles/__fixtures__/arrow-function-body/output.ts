import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

function buttonTokens(theme: Theme) {
  return {
    backgroundColor: theme.colorNeutralForeground1,
    backgroundColorHover: 'red',
    color: theme.colorPaletteBlueBorder2,
  };
}

export const useStyles = __styles(
  {
    root: {
      De3pzq: 'f1c73kur',
      sj55zd: 'ff34w31',
      mc9l5x: 'f22iagw',
      Bi91k9c: 'faf35ka',
    },
  },
  {
    d: [
      '.f1c73kur{background-color:var(--colorNeutralForeground1);}',
      '.ff34w31{color:var(--colorPaletteBlueBorder2);}',
      '.f22iagw{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}',
    ],
    h: ['.faf35ka:hover{color:red;}'],
  },
);
