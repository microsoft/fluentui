import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useDisplayStyles } from './useDisplayStyles.styles';

/**
 * Text preset component for the Display typography variant
 */
export const Display: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useDisplayStyles,
  displayName: 'Display',
});
