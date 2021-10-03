import { makeStyles } from '@fluentui/react-make-styles';
import { createModule } from './module';

export const useStyles = makeStyles({
  container: theme => {
    // This assignment has no sense, but it will prevent us from evaluation in AST
    const color = theme.colorNeutralStroke1;

    return { color };
  },
});

createModule().baz();
