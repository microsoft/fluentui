import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createWrapper, TextWrapperProps } from '../wrapper';
import { SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots } from '../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

/**
 * @deprecated Use `caption2ClassNames.root` instead.
 */
export const caption2ClassName = 'fui-Caption2';
export const caption2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption2,
});

/**
 * Text wrapper component for the Caption2 typography variant
 */
export const Caption2: FunctionComponent<TextWrapperProps> = createWrapper({
  useStyles,
  className: caption2ClassNames.root,
  displayName: 'Caption2',
});
