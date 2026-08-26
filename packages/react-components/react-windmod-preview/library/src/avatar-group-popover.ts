export {
  AvatarGroupPopover,
  avatarGroupPopoverClassNames,
  useAvatarGroupPopoverStyles,
} from './components/AvatarGroupPopover';
export type {
  AvatarGroupPopoverPopoverProps,
  AvatarGroupPopoverProps,
  AvatarGroupPopoverSlots,
  AvatarGroupPopoverState,
} from './components/AvatarGroupPopover';

/** Headless building blocks, re-exported for consumers composing their own AvatarGroupPopover.
 * `useAvatarGroupPopoverContextValues` is withheld: paired with `renderAvatarGroupPopover` it
 * produces Griffel-divergent overflow sizing — see AvatarGroupPopover.tsx. */
export {
  renderAvatarGroupPopover,
  useAvatarGroupPopover,
} from '@fluentui/react-headless-components-preview/avatar-group';
