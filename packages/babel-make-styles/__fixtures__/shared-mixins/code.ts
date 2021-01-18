import { makeStyles } from '@fluentui/react-make-styles';
import { sharedStyles } from './mixins';

export const useStyles = makeStyles({
  ...sharedStyles,
  icon: { color: 'red' },
});
