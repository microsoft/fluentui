import type {
  InteractionTagSecondaryProps as InteractionTagSecondaryHeadlessProps,
  InteractionTagSecondaryState as InteractionTagSecondaryHeadlessState,
} from '@fluentui/react-headless-components-preview/interaction-tag';

import type {
  InteractionTagAppearance,
  InteractionTagShape,
  InteractionTagSize,
} from '../InteractionTag/InteractionTag.types';

export type { InteractionTagSecondarySlots } from '@fluentui/react-headless-components-preview/interaction-tag';

/**
 * Windmod InteractionTagSecondary props: the headless props unchanged. The look props stay on the
 * InteractionTag — Griffel's styled secondary accepts none of them either, reading all three from
 * the tag's context.
 */
export type InteractionTagSecondaryProps = InteractionTagSecondaryHeadlessProps;

/**
 * Windmod InteractionTagSecondary state: headless state plus the look the tag published. Griffel
 * omits the three from `InteractionTagSecondaryBaseState`
 * (`react-tags/.../InteractionTagSecondary.types.ts:27`), which is what the headless surface
 * re-exports.
 */
export type InteractionTagSecondaryState = InteractionTagSecondaryHeadlessState & {
  appearance: InteractionTagAppearance;
  shape: InteractionTagShape;
  size: InteractionTagSize;
};
