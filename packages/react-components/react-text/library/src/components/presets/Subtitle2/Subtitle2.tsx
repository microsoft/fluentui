import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useSubtitle2Styles } from './useSubtitle2Styles.styles';

/**
 * Text preset component for the Subtitle2 typography variant
 */
export const Subtitle2: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useSubtitle2Styles,
  displayName: 'Subtitle2',
});
