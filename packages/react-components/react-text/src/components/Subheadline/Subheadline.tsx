import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `subheadlineClassNames.root` instead.
 */
export const subheadlineClassName = 'fui-Subheadline';
export const subheadlineClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subheadline',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle2,
});

/**
 * Text wrapper component for the Subheadline typography variant
 */
export const Subheadline: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: subheadlineClassNames.root,
  displayName: 'Subheadline',
});
