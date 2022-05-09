import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `title1ClassNames.root` instead.
 */
export const title1ClassName = 'fui-Title1';
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
export const Title1: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: title1ClassNames.root,
  displayName: 'Title1',
});
