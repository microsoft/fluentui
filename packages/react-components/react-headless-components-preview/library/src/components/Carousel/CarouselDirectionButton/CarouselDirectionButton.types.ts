import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonProps } from '../../Button';

export type CarouselDirectionButtonSlots = {
  /**
   * Layout wrapper that reserves the arrow's space. At a non-circular boundary it stays in layout but is
   * `hidden` and `inert`; style `[hidden]` with `visibility: hidden` rather than `display: none`.
   */
  root: Slot<'div'>;
  /** Icon-only button. Supply the chevron through `button={{ icon }}`; mirror it in RTL. */
  button: NonNullable<Slot<Extract<ButtonProps, { as?: 'button' }>>>;
  /** Tooltip that names the button through `aria-labelledby`. Defaults to "Previous" or "Next". */
  tooltip: NonNullable<Slot<'div'>>;
};

export type CarouselDirectionButtonProps = ComponentProps<Partial<CarouselDirectionButtonSlots>>;

export type CarouselDirectionButtonState = ComponentState<CarouselDirectionButtonSlots> & {
  kind: 'previous' | 'next';
  /** False when the collection has fewer than two groups, which omits both arrow slots. */
  rendered: boolean;
  /** Boundary reached and the transition settled. */
  hidden: boolean;
  /** Boundary reached; while a transition runs the button remains an `aria-disabled` focus anchor. */
  unavailable: boolean;
};
