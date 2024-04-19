import type { FunctionComponent } from 'react';
import { createPreset } from '../createPreset';
import type { TextPresetProps } from '../../Text/Text.types';
import { title3ClassNames, useTitle3Styles } from './useTitle3Styles.styles';

/**
 * Text preset component for the Title 3 typography variant
 */
export const Title3: FunctionComponent<TextPresetProps> = createPreset({
  useStyles: useTitle3Styles,
  className: title3ClassNames.root,
  displayName: 'Title3',
});
