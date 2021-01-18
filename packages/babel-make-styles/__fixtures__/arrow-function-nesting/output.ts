import { prebuildStyles } from '@fluentui/react-make-styles';
import { colorBlue } from './consts';
export const useStyles = prebuildStyles({
  root: {
    display: ['', 'f22iagw0', '.f22iagw0{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}'],
    ':hovercolor': ['h', 'faf35ka0', '.faf35ka0:hover{color:red;}'],
    ':focus:hovercolor': ['f', 'f17t1d3d', '.f17t1d3d:focus:hover{color:blue;}'],
    ' .foo:hovercolor': ['', 'f1gwxnus', '.f1gwxnus .foo:hover{color:var(--alias-color-green-foreground1);}'],
  },
});
