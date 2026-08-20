'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import {
  useDashboardGridContext_unstable,
  useRequiredDashboardGridProviderContext_unstable,
} from '../../contexts';
import { createDashboardGridDropZone } from '../../interaction/dropZones';
import {
  dashboardGridDataAttributes,
  type DashboardGridDropAcceptanceContext,
  type DashboardGridDropZoneKind,
  type DashboardGridDropZoneVisualState,
} from '../../interaction/types';
import type {
  DashboardGridDropZoneProps,
  DashboardGridDropZoneState,
} from './DashboardGridDropZone.types';

type ExtendedDashboardGridDropZoneProps = DashboardGridDropZoneProps & {
  id: string;
  gridId?: string;
  kind?: DashboardGridDropZoneKind;
  label?: string;
  disabled?: boolean;
  accepts?: boolean | ((context: DashboardGridDropAcceptanceContext) => boolean);
};

export type DashboardGridDropZoneInternalState = DashboardGridDropZoneState & {
  dropState: DashboardGridDropZoneVisualState;
  disabled: boolean;
};

export const useDashboardGridDropZone_unstable = (
  props: DashboardGridDropZoneProps,
  ref: React.Ref<HTMLDivElement>,
): DashboardGridDropZoneInternalState => {
  const extendedProps = props as ExtendedDashboardGridDropZoneProps;
  const coordinator = useRequiredDashboardGridProviderContext_unstable(context => context.coordinator);
  const contextGridId = useDashboardGridContext_unstable(context => context.gridId);
  const {
    id,
    gridId = contextGridId,
    kind = gridId ? 'grid' : 'custom',
    label,
    disabled = false,
    accepts,
    indicator: indicatorShorthand,
    ...rootProps
  } = extendedProps;
  const [rootElement, setRootElement] = React.useState<HTMLDivElement | null>(null);
  const [dropState, setDropState] = React.useState<DashboardGridDropZoneVisualState>({
    active: false,
    valid: false,
  });

  useIsomorphicLayoutEffect(() => {
    if (!coordinator || !rootElement) {
      return;
    }

    const controller = createDashboardGridDropZone({
      coordinator,
      registration: {
        id,
        element: rootElement,
        gridId,
        kind,
        label,
        disabled,
        accepts,
        onStateChange: setDropState,
      },
    });
    return () => controller.destroy();
  }, [accepts, coordinator, disabled, gridId, id, kind, label, rootElement]);

  const visualState = !dropState.active ? 'idle' : dropState.valid ? 'valid' : 'invalid';
  const root = slot.always(
    getIntrinsicElementProps('div', {
      ...rootProps,
      ref: useMergedRefs(ref, setRootElement),
      role: rootProps.role ?? 'group',
      'aria-label': label ?? rootProps['aria-label'],
      'aria-disabled': disabled || undefined,
      [dashboardGridDataAttributes.dropZone]: id,
      'data-dashboard-grid-drop-state': visualState,
    }),
    { elementType: 'div' },
  );
  const indicatorRef = React.useCallback((element: HTMLDivElement | null) => {
    element?.setAttribute('inert', '');
  }, []);
  const indicator = slot.always(indicatorShorthand ?? undefined, {
    elementType: 'div',
    defaultProps: {
      ref: indicatorRef,
      'aria-hidden': true,
      ...({
        'data-dashboard-grid-drop-valid': dropState.active ? String(dropState.valid) : undefined,
      } as Record<string, string | undefined>),
    },
  });

  return {
    components: {
      root: 'div',
      indicator: 'div',
    },
    root,
    indicator,
    dropState,
    disabled,
  } as DashboardGridDropZoneInternalState;
};
