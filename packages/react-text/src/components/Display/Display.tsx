import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';

/**
 * @deprecated Use `displayClassNames.root` instead.
 */
export const displayClassName = 'fui-Display';
export const displayClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Display',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.display,
});

/**
 * Text wrapper component for the Display typography variant
 */
export const Display: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: displayClassNames.root,
  displayName: 'Display',
});
