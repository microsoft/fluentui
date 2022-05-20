import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `captionClassNames.root` instead.
 */
export const captionClassName = 'fui-Caption';
export const captionClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption1,
});

/**
 * Text wrapper component for the Caption typography variant
 */
export const Caption: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: captionClassNames.root,
  displayName: 'Caption',
});
