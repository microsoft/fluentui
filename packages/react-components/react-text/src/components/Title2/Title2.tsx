import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `title2ClassNames.root` instead.
 */
export const title2ClassName = 'fui-Title2';
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
 * Text wrapper component for the Title 2 typography variant
 */
export const Title2: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: title2ClassNames.root,
  displayName: 'Title2',
});
