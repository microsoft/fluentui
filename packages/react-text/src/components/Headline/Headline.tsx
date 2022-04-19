import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';

/**
 * @deprecated Use `headlineClassNames.root` instead.
 */
export const headlineClassName = 'fui-Headline';
export const headlineClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Headline',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.headline,
});

/**
 * Text wrapper component for the Headline typography variant
 */
export const Headline: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: headlineClassNames.root,
  displayName: 'Headline',
});
