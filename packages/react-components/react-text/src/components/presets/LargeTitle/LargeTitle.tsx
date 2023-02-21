import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const largeTitleClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-LargeTitle',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.largeTitle,
});

/**
 * Text preset component for the Large Title typography variant
 */
export const LargeTitle: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: largeTitleClassNames.root,
  displayName: 'LargeTitle',
});
