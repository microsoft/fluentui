import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset, TextWrapperProps } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const title1ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Title1',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.title1,
});

/**
 * Text wrapper component for the Title 1 typography variant
 */
export const Title1: FunctionComponent<TextWrapperProps> = createPreset({
  useStyles,
  className: title1ClassNames.root,
  displayName: 'Title1',
});
