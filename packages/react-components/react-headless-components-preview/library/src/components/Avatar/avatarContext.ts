'use client';

/**
 * Re-export of the Griffel Avatar context, mirroring how `Field` re-exports `useFieldContext`
 * (`../Field/useFieldContextValues.ts`).
 *
 * The context INSTANCE has to be Griffel's: `renderTag` and `renderInteractionTagPrimary`,
 * re-exported unchanged from `@fluentui/react-tags`, wrap their `media` slot in
 * `AvatarContextProvider`, and `useTagContextValues` is Griffel's own
 * `useTagAvatarContextValues_unstable`. A second context created here would be a different
 * instance and would never receive those values.
 *
 * The value is look-only (`{ shape, size }`), so nothing in the headless layer consumes it — a
 * styling layer does, which is why it is published rather than used here.
 */
export { useAvatarContext, AvatarContextProvider } from '@fluentui/react-avatar';
export type { AvatarContextValue } from '@fluentui/react-avatar';
