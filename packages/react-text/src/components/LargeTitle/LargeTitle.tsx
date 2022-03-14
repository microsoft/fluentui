import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { typographyStyles } from '../../typographyStyles/index';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';

/**
 * @deprecated Use `largeTitleClassNames.root` instead.
 */
export const largeTitleClassName = 'fui-LargeTitle';
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
export const LargeTitle: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: largeTitleClassNames.root,
  displayName: 'LargeTitle',
});
