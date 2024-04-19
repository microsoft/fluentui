import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { subtitle1ClassNames, useSubtitle1Styles } from './useSubtitle1Styles.styles';

/**
 * Text preset component for the Subtitle1 typography variant
 */
export const Subtitle1: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useSubtitle1Styles,
  className: subtitle1ClassNames.root,
  displayName: 'Subtitle1',
});
