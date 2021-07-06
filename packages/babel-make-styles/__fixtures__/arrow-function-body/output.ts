import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

function buttonTokens(theme: Theme) {
  return {
    backgroundColor: theme.global.color.black,
    backgroundColorHover: 'red',
    color: theme.alias.color.blue.border2,
  };
}

export const useStyles = __styles(
  {
    root: {
      De3pzq: 'fbrlg6g',
      sj55zd: 'fk38h1u',
      mc9l5x: 'f22iagw',
      Bi91k9c: 'faf35ka',
    },
  },
  {
    d: [
      '.fbrlg6g{background-color:var(--global-color-black);}',
      '.fk38h1u{color:var(--alias-color-blue-border2);}',
      '.f22iagw{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}',
    ],
    h: ['.faf35ka:hover{color:red;}'],
  },
);
