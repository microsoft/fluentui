import { makeStyles } from '@fluentui/react-make-styles';

// @ts-expect-error
export const useStyles = makeStyles({ root: { color: 'red' } }, 'foo');
