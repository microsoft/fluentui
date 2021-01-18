import { makeStyles } from '@fluentui/react-make-styles';
import { colorBlue } from './consts';

export const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',

    ':hover': { color: 'red' },
    ':focus': { ':hover': { color: colorBlue } },

    '& .foo': { ':hover': { color: theme.alias.color.green.foreground1 } },
  }),
});
