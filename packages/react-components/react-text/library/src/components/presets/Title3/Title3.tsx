import * as React from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { useTitle3Styles } from './useTitle3Styles.styles';

/**
 * Text preset component for the Title 3 typography variant
 */
export const Title3: React.FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useTitle3Styles,
  displayName: 'Title3',
});
