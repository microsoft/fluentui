import type {
  ComponentProps,
  ComponentState,
  Slot,
} from '@fluentui/react-utilities';
import type { DashboardGridLayoutItemInput } from '../../engine';
import type { DashboardGridResizeEdge } from '../../interaction/types';
import type { DashboardGridItemPrintOptions } from '../../state/DashboardGridStore.types';

export type DashboardGridItemSlots = {
  root: NonNullable<Slot<'div'>>;
  content: NonNullable<Slot<'div'>>;
  dragHandle?: Slot<'div'>;
  resizeHandle?: Slot<'button'>;
  subGrid?: Slot<'div'>;
};

export type DashboardGridItemProps = ComponentProps<Partial<DashboardGridItemSlots>> &
  DashboardGridLayoutItemInput & {
    label?: string;
    resizeDirections?: readonly DashboardGridResizeEdge[];
    cancel?: string;
    lazyMount?: boolean;
    sizeToContent?: boolean | number;
    print?: DashboardGridItemPrintOptions;
  };

export type DashboardGridItemState = ComponentState<DashboardGridItemSlots>;
