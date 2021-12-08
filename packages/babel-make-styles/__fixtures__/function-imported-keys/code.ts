import { makeStyles } from '@fluentui/react-make-styles';
import { className, color, selector } from './consts';

export const useStyles = makeStyles({
  rootA: theme => ({
    [selector]: { [color]: theme.colorBrandBackground },
  }),
  rootB: theme => ({
    [`& .${className}`]: { color: theme.colorBrandBackground },
  }),
});
