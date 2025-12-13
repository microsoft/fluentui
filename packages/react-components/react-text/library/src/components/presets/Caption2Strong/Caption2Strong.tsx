import * as React from 'react';
import { createPreset } from '../createPreset';

import type { TextPresetProps } from '../../Text/Text.types';
import { useCaption2StrongStyles } from './useCaption2StrongStyles.styles';

/**
 * Text preset component for the Caption2Strong typography variant
 */
export const Caption2Strong: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption2StrongStyles,
  displayName: 'Caption2Strong',
});
