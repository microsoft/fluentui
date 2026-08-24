import type {
  ComponentProps,
  ComponentState,
  EventHandler,
  Slot,
} from '@fluentui/react-utilities';
import type {
  DashboardGridDragSourceRegistration,
  DashboardGridExternalItemDescriptor,
} from '../../interaction/types';

/** Slots available on the DashboardGridDragSource component. */
export type DashboardGridDragSourceSlots = {
  /** Root interactive element that arms the external drag source. */
  root: Slot<'div'>;
  /** Optional dedicated, inert visual preview used while dragging. */
  preview?: Slot<'div'>;
};

/** Data emitted when keyboard activation needs an explicit destination. */
export type DashboardGridDragSourceKeyboardActivateData = {
  type: 'keydown';
  event: KeyboardEvent;
  registration: DashboardGridDragSourceRegistration;
};

/** Props for the DashboardGridDragSource component. */
export type DashboardGridDragSourceProps = ComponentProps<DashboardGridDragSourceSlots> & {
  /** Stable source identifier within the containing provider. */
  id: string;
  /** Item metadata, or a factory that creates fresh metadata for each activation. */
  descriptor: DashboardGridExternalItemDescriptor | (() => DashboardGridExternalItemDescriptor);
  /** Localized accessible name for the source. */
  label?: string;
  /** Prevents pointer and keyboard activation. */
  disabled?: boolean;
  /** Handles keyboard activation when the provider cannot infer a unique target grid. */
  onKeyboardActivate?: EventHandler<DashboardGridDragSourceKeyboardActivateData>;
};

/** State used to render the DashboardGridDragSource component. */
export type DashboardGridDragSourceState = ComponentState<DashboardGridDragSourceSlots>;
