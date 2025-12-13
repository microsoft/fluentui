import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useBody2Styles } from './useBody2Styles.styles';

/**
 * Text preset component for the Body2 typography variant
 */
export const Body2: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useBody2Styles,
  displayName: 'Body2',
});
