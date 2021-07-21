import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subheadline,
});

/**
 * Text wrapper component for the Subheadline typography variant
 */
export const Subheadline = createWrapper({ useStyles, displayName: 'Subheadline' });
