'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useRequiredDashboardGridProviderContext_unstable } from '../contexts';
import { createDashboardGridExternalSource } from '../interaction/externalSources';
import type {
  DashboardGridDragSourceRegistration,
  DashboardGridExternalItemDescriptor,
} from '../interaction/types';

export type UseDashboardGridDragSourceOptions = {
  id: string;
  descriptor: DashboardGridExternalItemDescriptor | (() => DashboardGridExternalItemDescriptor);
  label?: string;
  disabled?: boolean;
  onKeyboardActivate?: (
    registration: DashboardGridDragSourceRegistration,
    event: KeyboardEvent,
  ) => void;
};

export type DashboardGridDragSourceHookResult<TElement extends HTMLElement = HTMLElement> = {
  sourceRef: React.RefCallback<TElement>;
  previewRef: React.RefCallback<HTMLElement>;
  onPointerDown: React.PointerEventHandler<TElement>;
  onKeyDown: React.KeyboardEventHandler<TElement>;
};

export const useDashboardGridDragSource = <TElement extends HTMLElement = HTMLElement>(
  options: UseDashboardGridDragSourceOptions,
): DashboardGridDragSourceHookResult<TElement> => {
  const coordinator = useRequiredDashboardGridProviderContext_unstable(context => context.coordinator);
  const targetDocument = useRequiredDashboardGridProviderContext_unstable(context => context.targetDocument);
  const { descriptor, disabled, id, label, onKeyboardActivate } = options;
  const [sourceElement, setSourceElement] = React.useState<TElement | null>(null);
  const [previewElement, setPreviewElement] = React.useState<HTMLElement | null>(null);
  const controllerRef = React.useRef<
    ReturnType<typeof createDashboardGridExternalSource> | undefined
  >(undefined);

  React.useEffect(() => {
    if (!sourceElement || !coordinator || !targetDocument) {
      return;
    }

    const registration: DashboardGridDragSourceRegistration = {
      id,
      descriptor,
      disabled,
      label,
      element: sourceElement,
      previewElement,
    };
    const controller = createDashboardGridExternalSource({
      targetDocument,
      coordinator,
      registration,
      onKeyboardActivate,
    });
    controllerRef.current = controller;

    return () => {
      controller.destroy();
      if (controllerRef.current === controller) {
        controllerRef.current = undefined;
      }
    };
  }, [
    coordinator,
    descriptor,
    disabled,
    id,
    label,
    onKeyboardActivate,
    previewElement,
    sourceElement,
    targetDocument,
  ]);

  return {
    sourceRef: React.useCallback((element: TElement | null) => setSourceElement(element), []),
    previewRef: React.useCallback((element: HTMLElement | null) => setPreviewElement(element), []),
    onPointerDown: useEventCallback(event => controllerRef.current?.onPointerDown(event.nativeEvent)),
    onKeyDown: useEventCallback(event => controllerRef.current?.onKeyDown(event.nativeEvent)),
  };
};
