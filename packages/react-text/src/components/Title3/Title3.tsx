import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title3,
});

/**
 * Text wrapper component for the Title 3 typography variant
 */
export const Title3 = createWrapper({ useStyles, displayName: 'Title3' });
