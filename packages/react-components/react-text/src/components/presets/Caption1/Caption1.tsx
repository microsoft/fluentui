import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { caption1ClassNames, useCaption1Styles } from './useCaption1Styles.styles';

/**
 * Text preset component for the Caption1 typography variant
 */
export const Caption1: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption1Styles,
  className: caption1ClassNames.root,
  displayName: 'Caption1',
});
