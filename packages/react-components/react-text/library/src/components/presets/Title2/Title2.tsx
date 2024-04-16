import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { title2ClassNames, useTitle2Styles } from './useTitle2Styles.styles';

/**
 * Text preset component for the Title 2 typography variant
 */
export const Title2: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useTitle2Styles,
  className: title2ClassNames.root,
  displayName: 'Title2',
});
