export { TagGroup, tagGroupClassNames, useTagGroupStyles } from './components/TagGroup';
export type {
  TagGroupAppearance,
  TagGroupContextValues,
  TagGroupProps,
  TagGroupSize,
  TagGroupSlots,
  TagGroupState,
} from './components/TagGroup';

/** Headless building blocks, re-exported for consumers composing their own TagGroup. */
export {
  renderTagGroup,
  useTagGroup,
  useTagGroupContextValues,
} from '@fluentui/react-headless-components-preview/tag-group';
