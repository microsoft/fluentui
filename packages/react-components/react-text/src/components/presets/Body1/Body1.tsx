import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { body1ClassNames, useBody1Styles } from './useBody1Styles.styles';

/**
 * Text preset component for the Body1 typography variant
 */
export const Body1: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useBody1Styles,
  className: body1ClassNames.root,
  displayName: 'Body1',
});
