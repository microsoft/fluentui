import { makeStyles } from '@fluentui/react-make-styles';
import { flexStyles, gridStyles, typography } from './mixins';

export const useStyles = makeStyles({
  root: flexStyles,
  header: typography.header,

  icon: { ...flexStyles, color: 'red' },
  image: { ...gridStyles('10px'), color: 'green' },
});
