import { __styles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

function buttonTokens(theme: Theme) {
  return {
    backgroundColor: theme.global.color.black,
    backgroundColorHover: 'red',
    color: theme.alias.color.blue.border2,
  };
}

export const useStyles = __styles({
  root: {
    '3e3pzq0': ['', 'fbrlg6g0', '.fbrlg6g0{background-color:var(--global-color-black);}'],
    sj55zd0: ['', 'fk38h1u0', '.fk38h1u0{color:var(--alias-color-blue-border2);}'],
    mc9l5x0: ['', 'f22iagw0', '.f22iagw0{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}'],
    '1i91k9c': ['h', 'faf35ka0', '.faf35ka0:hover{color:red;}'],
  },
});
