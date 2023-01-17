import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
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
 * Text wrapper component for the Large Title typography variant
 */
export const LargeTitle: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: largeTitleClassNames.root,
  displayName: 'LargeTitle',
});
