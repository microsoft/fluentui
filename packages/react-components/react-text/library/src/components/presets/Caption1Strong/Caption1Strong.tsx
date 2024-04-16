import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { caption1StrongClassNames, useCaption1StrongStyles } from './useCaption1StrongStyles.styles';

/**
 * Text preset component for the Caption1Strong typography variant
 */
export const Caption1Strong: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption1StrongStyles,
  className: caption1StrongClassNames.root,
  displayName: 'Caption1Strong',
});
