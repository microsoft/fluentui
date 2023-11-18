import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { body1StrongClassNames, useBody1StrongStyles } from './useBody1StrongStyles.styles';

/**
 * Text preset component for the Body1Strong typography variant
 */
export const Body1Strong: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useBody1StrongStyles,
  className: body1StrongClassNames.root,
  displayName: 'Body1Strong',
});
