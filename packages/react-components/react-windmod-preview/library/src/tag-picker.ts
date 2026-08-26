export { TagPicker } from './components/TagPicker';
export type { TagPickerAppearance, TagPickerProps, TagPickerSize, TagPickerState } from './components/TagPicker';

/** Headless building blocks, re-exported for consumers composing their own TagPicker. */
export {
  renderTagPicker,
  useTagPicker,
  useTagPickerContextValues,
  useTagPickerContext_unstable,
  useTagPickerFilter,
} from '@fluentui/react-headless-components-preview/tag-picker';
export type {
  TagPickerContextValue,
  TagPickerContextValues,
  TagPickerOnOpenChangeData,
  TagPickerOnOptionSelectData,
  TagPickerSlots,
} from '@fluentui/react-headless-components-preview/tag-picker';
