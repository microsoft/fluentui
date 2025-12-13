import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useSubtitle1Styles } from './useSubtitle1Styles.styles';

/**
 * Text preset component for the Subtitle1 typography variant
 */
export const Subtitle1: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useSubtitle1Styles,
  displayName: 'Subtitle1',
});
