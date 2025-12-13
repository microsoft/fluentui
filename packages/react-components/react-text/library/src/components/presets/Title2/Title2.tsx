import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useTitle2Styles } from './useTitle2Styles.styles';

/**
 * Text preset component for the Title 2 typography variant
 */
export const Title2: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useTitle2Styles,
  displayName: 'Title2',
});
