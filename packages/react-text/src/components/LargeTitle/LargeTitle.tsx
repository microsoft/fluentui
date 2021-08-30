import { makeStyles } from '@fluentui/react-make-styles';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper } from '../wrapper';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.largeTitle,
});

/**
 * Text wrapper component for the Large Title typography variant
 */
export const LargeTitle = createWrapper({ useStyles, displayName: 'LargeTitle' });
