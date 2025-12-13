import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useCaption1StrongStyles } from './useCaption1StrongStyles.styles';

/**
 * Text preset component for the Caption1Strong typography variant
 */
export const Caption1Strong: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption1StrongStyles,
  displayName: 'Caption1Strong',
});
