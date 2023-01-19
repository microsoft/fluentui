import type { FunctionComponent } from 'react';
import { makeStyles } from '@griffel/react';
import { createPreset } from '../createPreset';
import { SlotClassNames } from '@fluentui/react-utilities';
import type { TextSlots, TextPresetProps } from '../../Text/Text.types';
import { typographyStyles } from '@fluentui/react-theme';

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
 * Text preset component for the Caption2 typography variant
 */
export const Caption2: FunctionComponent<TextPresetProps> = createPreset({
  useStyles,
  className: caption2ClassNames.root,
  displayName: 'Caption2',
});
