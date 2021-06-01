import { makeStyles } from '@fluentui/react-make-styles';
import { createMixin } from './mixins';

export const useStyles = makeStyles({
  avatar: createMixin({ display: 'block', opacity: '0' }),
});
