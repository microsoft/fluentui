import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { caption1StrongerClassNames, useCaption1StrongerStyles } from './useCaption1Stronger.styles';

/**
 * Text preset component for the Caption1Stronger typography variant
 */
export const Caption1Stronger: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption1StrongerStyles,
  className: caption1StrongerClassNames.root,
  displayName: 'Caption1Stronger',
});
