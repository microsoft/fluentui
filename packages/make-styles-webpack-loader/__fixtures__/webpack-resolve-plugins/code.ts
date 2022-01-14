import { makeStyles } from '@fluentui/react-make-styles';
import { tokens } from '@fluentui/react-theme';
// @ts-ignore
import color from 'non-existing-color-module';

const styles = makeStyles({
  root: {
    backgroundColor: color,
    color: tokens.colorBrandStroke1,
  },
});

console.log(styles);
