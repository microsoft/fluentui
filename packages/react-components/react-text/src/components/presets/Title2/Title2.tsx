import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title2,
});

/**
 * Text preset component for the Title 2 typography variant
 */
export const Title2: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: title2ClassNames.root,
  displayName: 'Title2',
});
