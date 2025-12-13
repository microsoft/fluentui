import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useCaption1Styles } from './useCaption1Styles.styles';

/**
 * Text preset component for the Caption1 typography variant
 */
export const Caption1: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption1Styles,
  displayName: 'Caption1',
});
