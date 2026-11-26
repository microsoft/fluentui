import type * as React from 'react';
import type { ComponentProps, ComponentState, RefAttributes, Slot } from '@fluentui/react-utilities';
import type { ButtonProps } from '../../Button';

export type CarouselDirectionButtonSlots = {
  /**
   * Layout wrapper that reserves the arrow's space. At a non-circular boundary it stays in layout but is
   * `hidden` and `inert`; style `[hidden]` with `visibility: hidden` rather than `display: none`.
   */
  root: Slot<'div'>;
  /** Icon-only button. Supply the chevron through `button={{ icon }}`; mirror it in RTL. */
  button: NonNullable<Slot<Extract<ButtonProps, { as?: 'button' }> & RefAttributes<HTMLButtonElement>>>;
  /** Tooltip that names the button through `aria-labelledby`. Defaults to "Previous" or "Next". */
  tooltip: NonNullable<Slot<'div'>>;
};

export type CarouselDirectionButtonProps = ComponentProps<Partial<CarouselDirectionButtonSlots>>;

export type CarouselDirectionButtonState = ComponentState<CarouselDirectionButtonSlots> & {
  root: {
    'data-carousel-button': 'previous' | 'next';
  };
  kind: 'previous' | 'next';
  /**
   * False whenever the collection isn't paged (fewer than two groups, or controls that can't reach every group, such
   * as a lone non-circular arrow). Only custom slots may stay mounted in hidden, inert staging.
   */
  rendered: boolean;
  /** Attach to a layout-free placeholder when the unmounted button's fieldset ancestry still matters. */
  probeRef?: React.RefObject<HTMLTemplateElement | null>;
  /** Keep a custom slot's actual button mounted for fieldset observation, including while hidden and inert. */
  keepButtonMounted?: boolean;
  /** Hidden at a settled boundary or while staging a custom slot. */
  hidden: boolean;
  /** Boundary reached; while a transition runs the button remains an `aria-disabled` focus anchor. */
  unavailable: boolean;
};
