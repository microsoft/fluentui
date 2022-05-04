import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `bodyClassNames.root` instead.
 */
export const bodyClassName = 'fui-Body';
export const bodyClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.body1,
});

/**
 * Text wrapper component for the Body typography variant
 */
export const Body: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: bodyClassNames.root,
  displayName: 'Body',
});
