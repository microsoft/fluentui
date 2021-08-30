import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title1,
});

/**
 * Text wrapper component for the Title 1 typography variant
 */
export const Title1 = createWrapper({ useStyles, displayName: 'Title1' });
