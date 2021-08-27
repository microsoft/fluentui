// @ts-expect-error This is a fake module, will be resolved by Webpack aliases
import { __styles } from 'react-make-styles';

const styles = __styles(
  {
    root: {
      De3pzq: 'f3xbvq9',
    },
  },
  {
    d: ['.f3xbvq9{background-color:red;}'],
  },
);

console.log(styles);
