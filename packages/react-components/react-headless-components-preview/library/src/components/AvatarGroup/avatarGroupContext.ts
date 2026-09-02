/**
 * Re-export of the Griffel AvatarGroup context, mirroring `../Avatar/avatarContext.ts`.
 *
 * The context INSTANCE has to be Griffel's: `renderAvatarGroup` and `renderAvatarGroupPopover`,
 * re-exported unchanged from `@fluentui/react-avatar`, wrap their subtrees in
 * `AvatarGroupProvider`. A second context created here would be a different instance and would
 * never receive those values.
 *
 * The value is look-only for a styling layer (`size`) plus two structural flags (`layout`,
 * `isOverflow`), so nothing in the headless layer consumes it — a styling layer does, which is why
 * it is published rather than used here.
 */
export { AvatarGroupProvider } from '@fluentui/react-avatar';
