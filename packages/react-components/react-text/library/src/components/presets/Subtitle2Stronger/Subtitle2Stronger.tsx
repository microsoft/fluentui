import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useSubtitle2StrongerStyles } from './useSubtitle2Stronger.styles';

/**
 * Text preset component for the Subtitle2Stronger typography variant
 */
export const Subtitle2Stronger: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useSubtitle2StrongerStyles,
  displayName: 'Subtitle2Stronger',
});
