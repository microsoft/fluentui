import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

export const caption2StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption2Strong',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: typographyStyles.caption2Strong,
});

/**
 * Text preset component for the Caption2Strong typography variant
 */
export const Caption2Strong: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: caption2StrongClassNames.root,
  displayName: 'Caption2Strong',
});
