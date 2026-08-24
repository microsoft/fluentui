import type {
  InteractionTagPrimaryProps as InteractionTagPrimaryHeadlessProps,
  InteractionTagPrimaryState as InteractionTagPrimaryHeadlessState,
} from '@fluentui/react-headless-components-preview/interaction-tag';

import type { AvatarShape, AvatarSize } from '../Avatar/Avatar.types';
import type {
  InteractionTagAppearance,
  InteractionTagShape,
  InteractionTagSize,
} from '../InteractionTag/InteractionTag.types';

export type {
  InteractionTagPrimaryContextValues,
  InteractionTagPrimarySlots,
} from '@fluentui/react-headless-components-preview/interaction-tag';

/**
 * Windmod InteractionTagPrimary props: the headless props unchanged. The look props stay on the
 * InteractionTag — Griffel's styled primary accepts none of them either, reading all three from
 * the tag's context.
 */
export type InteractionTagPrimaryProps = InteractionTagPrimaryHeadlessProps;

/**
 * Windmod InteractionTagPrimary state: headless state plus the look the tag published, and the two
 * derived values the primary passes on to a nested Avatar through `AvatarContext`.
 *
 * `avatarShape`/`avatarSize` are derived from the tag's `shape`/`size` and exist only to feed that
 * context. Griffel keeps them on its own state and omits them from `InteractionTagPrimaryBaseState`
 * (`react-tags/.../InteractionTagPrimary.types.ts:62`), which is what the headless surface
 * re-exports — so the headless state cannot carry them and windmod re-derives them here.
 */
export type InteractionTagPrimaryState = InteractionTagPrimaryHeadlessState & {
  appearance: InteractionTagAppearance;
  shape: InteractionTagShape;
  size: InteractionTagSize;
  avatarShape: AvatarShape;
  avatarSize: AvatarSize;
};
