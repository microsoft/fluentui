import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { body1StrongerClassNames, useBody1StrongerStyles } from './useBody1StrongerStyles.styles';

/**
 * Text preset component for the Body1Stronger typography variant
 */
export const Body1Stronger: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useBody1StrongerStyles,
  className: body1StrongerClassNames.root,
  displayName: 'Body1Stronger',
});
