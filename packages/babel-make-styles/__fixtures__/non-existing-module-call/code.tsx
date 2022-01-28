import { makeStyles } from '@fluentui/react-make-styles';
import { createModule } from './module';

export const useStyles = makeStyles({
  container: {
    color: 'red',
  },
});

createModule().baz();
