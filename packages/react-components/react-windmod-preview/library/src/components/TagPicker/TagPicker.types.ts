import type {
  TagPickerProps as TagPickerHeadlessProps,
  TagPickerState as TagPickerHeadlessState,
} from '@fluentui/react-headless-components-preview/tag-picker';

export type { TagPickerSize } from '@fluentui/react-headless-components-preview/tag-picker';

/** Colours and borders of the TagPicker control. `'outline'` is the base look. */
export type TagPickerAppearance = 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';

/**
 * Windmod TagPicker props: the headless tag picker plus the look props the headless surface
 * deliberately omits (they exist purely to select styles, here and in every member below).
 * `inline` stays omitted — the surface is always inline in the React tree and promoted to the top
 * layer, so the prop has no windmod meaning.
 */
export type TagPickerProps = TagPickerHeadlessProps & {
  /** @default 'outline' */
  appearance?: TagPickerAppearance;
  /** @default 'medium' */
  size?: TagPickerHeadlessState['size'];
};

/**
 * Windmod TagPicker state. The headless state already declares `appearance` and `size` — it fills
 * them with constants — so windmod resolves them rather than widening the type.
 */
export type TagPickerState = TagPickerHeadlessState;
