'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useRequiredDashboardGridProviderContext_unstable } from '../contexts';
import { createDashboardGridExternalSource } from '../interaction/externalSources';
import type {
  DashboardGridDragSourceRegistration,
  DashboardGridExternalItemDescriptor,
} from '../interaction/types';

/** Options for registering an external DashboardGrid drag source. */
export type UseDashboardGridDragSourceOptions = {
  /** Provider-local source identity. */
  id: string;
  /** Static or lazily evaluated external item descriptor. */
  descriptor: DashboardGridExternalItemDescriptor | (() => DashboardGridExternalItemDescriptor);
  /** Caller-localized accessible source name. */
  label?: string;
  /** Prevents pointer and keyboard activation. */
  disabled?: boolean;
  /** Selects or presents a destination when keyboard activation has multiple targets. */
  onKeyboardActivate?: (
    registration: DashboardGridDragSourceRegistration,
    event: KeyboardEvent,
  ) => void;
};

/** Refs and handlers applied by an external drag-source component. */
export type DashboardGridDragSourceHookResult<TElement extends HTMLElement = HTMLElement> = {
  /** Ref for the interactive source root. */
  sourceRef: React.RefCallback<TElement>;
  /** Ref for dedicated, aria-hidden preview content. */
  previewRef: React.RefCallback<HTMLElement>;
  /** Pointer activation handler. */
  onPointerDown: React.PointerEventHandler<TElement>;
  /** Keyboard activation handler. */
  onKeyDown: React.KeyboardEventHandler<TElement>;
};

/**
 * Registers a provider-scoped external source and returns DOM wiring for pointer and keyboard activation.
 */
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
