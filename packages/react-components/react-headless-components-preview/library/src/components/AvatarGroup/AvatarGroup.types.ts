import type {
  AvatarGroupBaseProps,
  AvatarGroupBaseState,
  AvatarGroupContextValue,
  AvatarGroupContextValues,
  AvatarGroupSlots as AvatarGroupBaseSlots,
} from '@fluentui/react-avatar';

/**
 * AvatarGroup component slots
 */
export type AvatarGroupSlots = AvatarGroupBaseSlots;

/**
 * AvatarGroup component props
 *
 * Mirrors the design-agnostic base props from `@fluentui/react-avatar`. The
 * styling-only `size` prop is intentionally omitted — headless components don't
 * own presentation.
 */
export type AvatarGroupProps = AvatarGroupBaseProps;

/**
 * AvatarGroup component state
 */
export type AvatarGroupState = AvatarGroupBaseState;

export type { AvatarGroupContextValue, AvatarGroupContextValues };
