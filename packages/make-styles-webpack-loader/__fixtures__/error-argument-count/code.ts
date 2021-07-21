// This file is .js intentionally to avoid TS compiler errors
import { makeStyles } from '@fluentui/react-make-styles';

// @ts-expect-error
export const useStyles = makeStyles({ root: { color: 'red' } }, 'foo');
