import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DialogSurfaceSlots = {
  root: Slot<'div', 'main'>;
};

/**
 * DialogSurface Props
 */
export type DialogSurfaceProps = ComponentProps<DialogSurfaceSlots> & {
  /**
   * Declares if focus will be trapped inside Dialog.
   * @default modalType !== 'non-modal'
   */
  trapFocus?: boolean;
};

/**
 * State used in rendering DialogSurface
 */
export type DialogSurfaceState = ComponentState<DialogSurfaceSlots>;
