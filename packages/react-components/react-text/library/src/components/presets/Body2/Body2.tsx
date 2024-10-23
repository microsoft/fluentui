import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { body2ClassNames, useBody2Styles } from './useBody2Styles.styles';

/**
 * Text preset component for the Body2 typography variant
 */
export const Body2: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useBody2Styles,
  className: body2ClassNames.root,
  displayName: 'Body2',
});
