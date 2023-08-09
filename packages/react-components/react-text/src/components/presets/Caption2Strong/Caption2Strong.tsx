import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';

import type { TextPresetProps } from '../../Text/Text.types';
import { caption2StrongClassNames, useCaption2StrongStyles } from './useCaption2StrongStyles.styles';

/**
 * Text preset component for the Caption2Strong typography variant
 */
export const Caption2Strong: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption2StrongStyles,
  className: caption2StrongClassNames.root,
  displayName: 'Caption2Strong',
});
