import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { title1ClassNames, useTitle1Styles } from './useTitle1Styles.styles';

/**
 * Text preset component for the Title 1 typography variant
 */
export const Title1: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useTitle1Styles,
  className: title1ClassNames.root,
  displayName: 'Title1',
});
