import type {
  SwitchProps as SwitchHeadlessProps,
  SwitchState as SwitchHeadlessState,
} from '@fluentui/react-headless-components-preview/switch';

export type { SwitchSlots } from '@fluentui/react-headless-components-preview/switch';

/** Size of the Switch track and thumb. */
export type SwitchSize = 'small' | 'medium';

/**
 * Windmod Switch props: the headless switch plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles).
 */
export type SwitchProps = SwitchHeadlessProps & {
  /** @default 'medium' */
  size?: SwitchSize;
};

/** Windmod Switch state: headless state plus the resolved look prop. */
export type SwitchState = SwitchHeadlessState & Required<Pick<SwitchProps, 'size'>>;
