'use client';

import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { subtitle2ClassNames, useSubtitle2Styles } from './useSubtitle2Styles.styles';

/**
 * Text preset component for the Subtitle2 typography variant
 */
export const Subtitle2: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useSubtitle2Styles,
  className: subtitle2ClassNames.root,
  displayName: 'Subtitle2',
});
