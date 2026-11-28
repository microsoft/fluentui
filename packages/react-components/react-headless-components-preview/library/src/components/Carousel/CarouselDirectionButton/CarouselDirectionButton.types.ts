import type { ComponentProps, ComponentState, RefAttributes, Slot } from '@fluentui/react-utilities';
import type { ButtonProps } from '../../Button';

export type CarouselDirectionButtonSlots = {
  /**
   * Layout wrapper that reserves the arrow's space. At a non-circular boundary it stays in layout but is
   * `hidden` and `inert`; style `[hidden]` with `visibility: hidden` rather than `display: none`.
   */
  root: Slot<'div'>;
  /**
   * Icon-only button, named "Previous" or "Next" through `aria-label` unless it has its own `aria-label` or
   * `aria-labelledby`. Supply the chevron through `button={{ icon }}`; mirror it in RTL. To add a tooltip, wrap the
   * button in a slot render function; `disabledFocusable` marks an arrow that is unavailable.
   */
  button: NonNullable<Slot<Extract<ButtonProps, { as?: 'button' }> & RefAttributes<HTMLButtonElement>>>;
};

export type CarouselDirectionButtonProps = ComponentProps<Partial<CarouselDirectionButtonSlots>>;

export type CarouselDirectionButtonState = ComponentState<CarouselDirectionButtonSlots> & {
  root: {
    'data-carousel-button': 'previous' | 'next';
  };
  kind: 'previous' | 'next';
  /** False when the collection isn't paged: fewer than two groups, or controls that can't reach every group. */
  rendered: boolean;
  /** Hidden at a settled boundary. */
  hidden: boolean;
  /** Boundary reached; while a transition runs the button remains an `aria-disabled` focus anchor. */
  unavailable: boolean;
};
