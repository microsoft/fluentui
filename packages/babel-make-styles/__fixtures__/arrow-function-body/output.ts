import { prebuildStyles } from '@fluentui/react-make-styles';
import { Theme } from '@fluentui/react-theme';

function buttonTokens(theme: Theme) {
  return {
    backgroundColor: theme.global.color.black,
    backgroundColorHover: 'red',
    color: theme.alias.color.blue.border2,
  };
}

export const useStyles = prebuildStyles({
  root: {
    backgroundColor: ['', 'fbrlg6g0', '.fbrlg6g0{background-color:var(--global-color-black);}'],
    color: ['', 'fk38h1u0', '.fk38h1u0{color:var(--alias-color-blue-border2);}'],
    display: ['', 'f22iagw0', '.f22iagw0{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}'],
    ':hovercolor': ['h', 'faf35ka0', '.faf35ka0:hover{color:red;}'],
  },
});
