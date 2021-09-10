import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body,
});

/**
 * Text wrapper component for the Body typography variant
 */
export const Body = createWrapper({ useStyles, displayName: 'Body' });
