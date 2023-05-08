import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { displayClassNames, useDisplayStyles } from './useDisplayStyles.styles';

/**
 * Text preset component for the Display typography variant
 */
export const Display: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useDisplayStyles,
  className: displayClassNames.root,
  displayName: 'Display',
});
