import type { TagPickerBaseProps } from '@fluentui/react-tag-picker';
import type { PositioningShorthand } from '../../positioning';

export type {
  TagPickerState,
  TagPickerContextValues,
  TagPickerSlots,
  TagPickerSize,
  TagPickerOnOpenChangeData,
  TagPickerOnOptionSelectData,
} from '@fluentui/react-tag-picker';

export type TagPickerProps = TagPickerBaseProps & {
  positioning?: PositioningShorthand;
};
