import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `subtitle2ClassNames.root` instead.
 */
export const subtitle2ClassName = 'fui-Subtitle2';
export const subtitle2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Subtitle2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.subtitle2,
});

/**
 * Text wrapper component for the Subtitle2 typography variant
 */
export const Subtitle2: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: subtitle2ClassNames.root,
  displayName: 'Subtitle2',
});
