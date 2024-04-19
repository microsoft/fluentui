import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { largeTitleClassNames, useLargeTitleStyles } from './useLargeTitleStyles.styles';

/**
 * Text preset component for the Large Title typography variant
 */
export const LargeTitle: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useLargeTitleStyles,
  className: largeTitleClassNames.root,
  displayName: 'LargeTitle',
});
