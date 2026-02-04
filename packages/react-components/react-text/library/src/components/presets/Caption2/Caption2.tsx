'use client';

import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { caption2ClassNames, useCaption2Styles } from './useCaption2Styles.styles';

/**
 * Text preset component for the Caption2 typography variant
 */
export const Caption2: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useCaption2Styles,
  className: caption2ClassNames.root,
  displayName: 'Caption2',
});
