import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { subtitle2StrongerClassNames, useSubtitle2StrongerStyles } from './useSubtitle2Stronger.styles';

/**
 * Text preset component for the Subtitle2Stronger typography variant
 */
export const Subtitle2Stronger: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useSubtitle2StrongerStyles,
  className: subtitle2StrongerClassNames.root,
  displayName: 'Subtitle2Stronger',
});
