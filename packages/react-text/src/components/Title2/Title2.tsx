import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title2,
});

/**
 * Text wrapper component for the Title 2 typography variant
 */
export const Title2 = createWrapper({ useStyles, displayName: 'Title2' });
