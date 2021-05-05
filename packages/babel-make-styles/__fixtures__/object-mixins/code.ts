import { makeStyles } from '@fluentui/react-make-styles';
import { flexStyles, gridStyles } from './mixins';

export const useStyles = makeStyles({
  root: flexStyles,

  icon: { ...flexStyles, color: 'red' },
  image: { ...gridStyles('10px'), color: 'green' },
});
