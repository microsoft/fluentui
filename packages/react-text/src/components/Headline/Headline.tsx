import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.headline,
});

/**
 * Text wrapper component for the Headline typography variant
 */
export const Headline = createWrapper({ useStyles, displayName: 'Headline' });
