import type {
  InteractionTagProps as InteractionTagHeadlessProps,
  InteractionTagState as InteractionTagHeadlessState,
} from '@fluentui/react-headless-components-preview/interaction-tag';

import type { TagAppearance, TagShape, TagSize } from '../Tag/Tag.types';

export type {
  InteractionTagContextValues,
  InteractionTagSlots,
} from '@fluentui/react-headless-components-preview/interaction-tag';

/** Visual style of the InteractionTag. `'filled'` is the base look. */
export type InteractionTagAppearance = TagAppearance;

/** Corner treatment of the InteractionTag. `'rounded'` is the base look. */
export type InteractionTagShape = TagShape;

/** Size of the InteractionTag. */
export type InteractionTagSize = TagSize;

/**
 * Windmod InteractionTag props: the headless interaction tag plus the look props the headless
 * surface deliberately omits (they exist purely to select styles).
 */
export type InteractionTagProps = InteractionTagHeadlessProps & {
  /** @default 'filled' */
  appearance?: InteractionTagAppearance;
  /** @default 'rounded' */
  shape?: InteractionTagShape;
  /** @default 'medium' */
  size?: InteractionTagSize;
};

/**
 * Windmod InteractionTag state: headless state plus the resolved look props. Griffel keeps the
 * three on its own `InteractionTagState` and omits them from `InteractionTagBaseState`
 * (`react-tags/.../InteractionTag.types.ts:96`), which is what the headless surface re-exports —
 * so the headless state cannot carry them and windmod resolves them here.
 */
export type InteractionTagState = InteractionTagHeadlessState &
  Required<Pick<InteractionTagProps, 'appearance' | 'shape' | 'size'>>;
