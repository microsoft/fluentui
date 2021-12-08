import { makeStyles } from '@fluentui/react-make-styles';
import { className, color, selector } from './consts';

export const useStyles = makeStyles({
  root: {
    [selector]: () => ({ [color]: 'red' }),
    [`& .${className}`]: () => ({ color: 'blue' }),
  },
});
