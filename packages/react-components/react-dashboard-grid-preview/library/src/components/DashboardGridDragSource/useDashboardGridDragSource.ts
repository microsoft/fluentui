'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useDashboardGridDragSource as useDashboardGridDragSourceHook } from '../../hooks/useDashboardGridDragSource';
import type {
  DashboardGridDragSourceRegistration,
  DashboardGridExternalItemDescriptor,
} from '../../interaction/types';
import { dashboardGridDataAttributes } from '../../interaction/types';
import type {
  DashboardGridDragSourceProps,
  DashboardGridDragSourceState,
} from './DashboardGridDragSource.types';

type ExtendedDashboardGridDragSourceProps = DashboardGridDragSourceProps & {
  id: string;
  descriptor: DashboardGridExternalItemDescriptor | (() => DashboardGridExternalItemDescriptor);
  label?: string;
  disabled?: boolean;
  onKeyboardActivate?: (
    registration: DashboardGridDragSourceRegistration,
    event: KeyboardEvent,
  ) => void;
};

export type DashboardGridDragSourceInternalState = DashboardGridDragSourceState & {
  disabled: boolean;
};

export const useDashboardGridDragSource_unstable = (
  props: DashboardGridDragSourceProps,
  ref: React.Ref<HTMLDivElement>,
): DashboardGridDragSourceInternalState => {
  const extendedProps = props as ExtendedDashboardGridDragSourceProps;
  const {
    id,
    descriptor,
    label,
    disabled = false,
    onKeyboardActivate,
    preview: previewShorthand,
    ...rootProps
  } = extendedProps;
  const dragSource = useDashboardGridDragSourceHook<HTMLDivElement>({
    id,
    descriptor,
    label,
    disabled,
    onKeyboardActivate,
  });
  const rootIntrinsicProps = getIntrinsicElementProps(
    'div',
    rootProps as React.HTMLAttributes<HTMLDivElement>,
  );

  const rootSlotProps = {
    ...rootIntrinsicProps,
    ref: useMergedRefs(ref, dragSource.sourceRef),
    role: rootIntrinsicProps.role ?? 'button',
    tabIndex: disabled ? -1 : rootIntrinsicProps.tabIndex ?? 0,
    'aria-label': label ?? rootIntrinsicProps['aria-label'],
    'aria-disabled': disabled || undefined,
    onPointerDown: mergeCallbacks(rootIntrinsicProps.onPointerDown, dragSource.onPointerDown),
    onKeyDown: mergeCallbacks(rootIntrinsicProps.onKeyDown, dragSource.onKeyDown),
  } as React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>;
  Object.assign(rootSlotProps, { [dashboardGridDataAttributes.dragSource]: id });
  const root = slot.always(rootSlotProps, { elementType: 'div' });
  const previewRef = useMergedRefs<HTMLDivElement>(
    dragSource.previewRef,
    React.useCallback((element: HTMLDivElement | null) => {
      element?.setAttribute('inert', '');
    }, []),
  );
  const preview = slot.optional(previewShorthand, {
    elementType: 'div',
    defaultProps: {
      ref: previewRef,
      'aria-hidden': true,
      tabIndex: -1,
      ...({ [dashboardGridDataAttributes.preview]: '' } as Record<string, string>),
    },
  });

  return {
    components: {
      root: 'div',
      preview: 'div',
    },
    root,
    preview,
    disabled,
  } as DashboardGridDragSourceInternalState;
};
