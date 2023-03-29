import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title3ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title3',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title3,
});

/**
 * Text preset component for the Title 3 typography variant
 */
export const Title3: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: title3ClassNames.root,
  displayName: 'Title3',
});
