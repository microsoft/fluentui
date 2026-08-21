import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type {
  DashboardGridDropAcceptanceContext,
  DashboardGridDropZoneKind,
} from '../../interaction/types';

/** Slots available on the DashboardGridDropZone component. */
export type DashboardGridDropZoneSlots = {
  /** Root hit target registered with the provider-scoped coordinator. */
  root: Slot<'div'>;
  /** Optional inert indicator that presents valid and invalid drop state. */
  indicator?: Slot<'div'>;
};

/** Props for the DashboardGridDropZone component. */
export type DashboardGridDropZoneProps = ComponentProps<DashboardGridDropZoneSlots> & {
  /** Stable drop-zone identifier within the containing provider. */
  id: string;
  /** Target grid. Defaults to the nearest DashboardGrid context when present. */
  gridId?: string;
  /** Behavior applied when an interaction is committed over the zone. */
  kind?: DashboardGridDropZoneKind;
  /** Localized accessible name for the zone. */
  label?: string;
  /** Prevents the zone from accepting interactions. */
  disabled?: boolean;
  /** Boolean or predicate acceptance policy evaluated for each active source. */
  accepts?: boolean | ((context: DashboardGridDropAcceptanceContext) => boolean);
};

/** State used to render the DashboardGridDropZone component. */
export type DashboardGridDropZoneState = ComponentState<DashboardGridDropZoneSlots>;
