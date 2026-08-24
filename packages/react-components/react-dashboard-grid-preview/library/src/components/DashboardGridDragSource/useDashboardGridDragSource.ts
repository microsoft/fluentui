'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  type RefAttributes,
  slot,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useDashboardGridDragSource as useDashboardGridDragSourceHook } from '../../hooks/useDashboardGridDragSource';
import type {
  DashboardGridDragSourceProps,
  DashboardGridDragSourceState,
} from './DashboardGridDragSource.types';
import { dashboardGridDataAttributes } from '../../interaction/types';

export type DashboardGridDragSourceInternalState = DashboardGridDragSourceState & {
  disabled: boolean;
};

/**
 * Creates the state required to render DashboardGridDragSource.
 */
export const useDashboardGridDragSource_unstable = (
  props: DashboardGridDragSourceProps,
  ref: React.Ref<HTMLDivElement>,
): DashboardGridDragSourceInternalState => {
  const {
    id,
    descriptor,
    label,
    disabled = false,
    onKeyboardActivate,
    preview: previewShorthand,
    ...rootProps
  } = props;
  const handleKeyboardActivate = useEventCallback(
    (registration: Parameters<NonNullable<Parameters<typeof useDashboardGridDragSourceHook>[0]['onKeyboardActivate']>>[0], event: KeyboardEvent) => {
      onKeyboardActivate?.(event, {
        type: 'keydown',
        event,
        registration,
      });
    },
  );
  const dragSource = useDashboardGridDragSourceHook<HTMLDivElement>({
    id,
    descriptor,
    label,
    disabled,
    onKeyboardActivate: onKeyboardActivate ? handleKeyboardActivate : undefined,
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
  } as React.HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>;
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
