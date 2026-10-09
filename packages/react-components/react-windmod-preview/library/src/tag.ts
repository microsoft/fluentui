export { Tag, tagClassNames, useTagStyles } from './components/Tag';
export type {
  TagAppearance,
  TagContextValues,
  TagProps,
  TagShape,
  TagSize,
  TagSlots,
  TagState,
} from './components/Tag';

/** Headless building blocks, re-exported for consumers composing their own Tag. */
export { renderTag, useTag, useTagContextValues } from '@fluentui/react-headless-components-preview/tag';
