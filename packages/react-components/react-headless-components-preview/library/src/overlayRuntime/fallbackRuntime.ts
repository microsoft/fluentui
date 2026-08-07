import * as React from 'react';
import { Escape } from '@fluentui/keyboard-keys';
import * as positioning from '@fluentui/react-positioning';
import { Portal } from '@fluentui/react-portal';
import {
  elementContains,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useOnClickOutside,
  useOnScrollOutside,
} from '@fluentui/react-utilities';
import { useActivateModal, useFocusFinders, useModalAttributes } from '@fluentui/react-tabster';
import { lockDocumentScroll, unlockDocumentScroll } from '../components/Dialog/utils/scroll';

type ElementRef = React.RefObject<HTMLElement | null>;

type DismissBehaviorProps = {
  contentRef: ElementRef;
  open: boolean;
  targetDocument: Document | undefined;
  triggerRef?: ElementRef;
  closeOnScroll?: boolean;
  onDismiss: (event: Event) => void;
};

type AutoOverlayEntry = {
  content: HTMLElement;
  dismiss: (event: Event) => void;
  trigger: HTMLElement | null;
};

const autoOverlayStacks = new WeakMap<Document, AutoOverlayEntry[]>();
const dialogStacks = new WeakMap<Document, HTMLElement[]>();
const tooltipEntries = new WeakMap<Document, { dismiss: (event: Event) => void }>();

const getAutoOverlayStack = (targetDocument: Document): AutoOverlayEntry[] => {
  const existingStack = autoOverlayStacks.get(targetDocument);
  if (existingStack) {
    return existingStack;
  }

  const stack: AutoOverlayEntry[] = [];
  autoOverlayStacks.set(targetDocument, stack);
  return stack;
};

const isNestedEntry = (parent: AutoOverlayEntry, child: AutoOverlayEntry): boolean =>
  elementContains(parent.content, child.trigger) || elementContains(parent.content, child.content);

const useAutoOverlayStack = (
  props: Pick<DismissBehaviorProps, 'contentRef' | 'onDismiss' | 'open' | 'targetDocument' | 'triggerRef'>,
): void => {
  const { contentRef, onDismiss, open, targetDocument, triggerRef } = props;

  useIsomorphicLayoutEffect(() => {
    const content = contentRef.current;
    if (!open || !content || !targetDocument) {
      return;
    }

    const stack = getAutoOverlayStack(targetDocument);
    const entry: AutoOverlayEntry = {
      content,
      dismiss: onDismiss,
      trigger: triggerRef?.current ?? null,
    };

    const peerDismissEvent = new Event('overlayPeerDismiss');
    for (const existingEntry of [...stack]) {
      if (!isNestedEntry(existingEntry, entry) && !isNestedEntry(entry, existingEntry)) {
        existingEntry.dismiss(peerDismissEvent);
      }
    }

    stack.push(entry);

    return () => {
      const index = stack.indexOf(entry);
      if (index !== -1) {
        stack.splice(index, 1);
      }
    };
  }, [contentRef, onDismiss, open, targetDocument, triggerRef]);
};

const useDismissBehavior = (props: DismissBehaviorProps): void => {
  const {
    closeOnScroll = false,
    contentRef,
    onDismiss,
    open,
    targetDocument,
    triggerRef,
  } = props;

  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: onDismiss,
    refs: triggerRef ? [triggerRef, contentRef] : [contentRef],
    disabled: !open,
  });

  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: onDismiss,
    refs: triggerRef ? [triggerRef, contentRef] : [contentRef],
    disabled: !open || !closeOnScroll,
  });

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    if (event.key !== Escape || event.defaultPrevented || !contentRef.current || !targetDocument) {
      return;
    }

    const stack = getAutoOverlayStack(targetDocument);
    if (stack.at(-1)?.content !== contentRef.current) {
      return;
    }

    event.preventDefault();
    onDismiss(event);
  });

  React.useEffect(() => {
    if (!open || !targetDocument) {
      return;
    }

    targetDocument.addEventListener('keydown', onKeyDown, true);
    return () => targetDocument.removeEventListener('keydown', onKeyDown, true);
  }, [onKeyDown, open, targetDocument]);
};

const setAttributes = (
  element: HTMLElement,
  attributes: Record<string, unknown>,
): (() => void) => {
  const previousValues = new Map<string, string | null>();

  for (const [name, value] of Object.entries(attributes)) {
    previousValues.set(name, element.getAttribute(name));

    if (value === undefined || value === null || value === false) {
      element.removeAttribute(name);
    } else {
      element.setAttribute(name, String(value));
    }
  }

  return () => {
    for (const [name, value] of previousValues) {
      if (value === null) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value);
      }
    }
  };
};

type FocusBehaviorProps = {
  contentRef: ElementRef;
  open: boolean;
  targetDocument: Document | undefined;
  trapFocus: boolean;
  triggerRef?: ElementRef;
};

const useFocusBehavior = (props: FocusBehaviorProps): void => {
  const { contentRef, open, targetDocument, trapFocus, triggerRef } = props;
  const { modalAttributes, triggerAttributes } = useModalAttributes({
    trapFocus,
    legacyTrapFocus: false,
    alwaysFocusable: !trapFocus,
  });
  const { findFirstFocusable } = useFocusFinders();
  const activateModal = useActivateModal();
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const content = contentRef.current;
    if (!open || !content) {
      return;
    }

    previouslyFocusedRef.current = targetDocument?.activeElement as HTMLElement | null;
    const restoreContentAttributes = setAttributes(
      content,
      modalAttributes as unknown as Record<string, unknown>,
    );
    const restoreTriggerAttributes = triggerRef?.current
      ? setAttributes(
          triggerRef.current,
          triggerAttributes as unknown as Record<string, unknown>,
        )
      : undefined;

    const autofocusTarget = content.querySelector<HTMLElement>('[autofocus]');
    const focusTarget = autofocusTarget ?? (trapFocus ? findFirstFocusable(content) : null);
    focusTarget?.focus();

    if (trapFocus && focusTarget === content) {
      activateModal(content);
    }

    return () => {
      restoreContentAttributes();
      restoreTriggerAttributes?.();

      const restoreTarget = triggerRef?.current ?? previouslyFocusedRef.current;
      if (
        restoreTarget &&
        targetDocument?.contains(restoreTarget) &&
        (!targetDocument.activeElement ||
          targetDocument.activeElement === targetDocument.body ||
          elementContains(content, targetDocument.activeElement))
      ) {
        restoreTarget.focus();
      }
      previouslyFocusedRef.current = null;
    };
  }, [
    activateModal,
    contentRef,
    findFirstFocusable,
    modalAttributes,
    open,
    targetDocument,
    trapFocus,
    triggerAttributes,
    triggerRef,
  ]);
};

export type FallbackPopoverBehaviorProps = DismissBehaviorProps & {
  trapFocus: boolean;
};

export const FallbackPopoverBehavior = (props: FallbackPopoverBehaviorProps): null => {
  useAutoOverlayStack(props);
  useDismissBehavior(props);
  useFocusBehavior(props);
  return null;
};

FallbackPopoverBehavior.displayName = 'FallbackPopoverBehavior';

export type FallbackMenuBehaviorProps = DismissBehaviorProps;

export const FallbackMenuBehavior = (props: FallbackMenuBehaviorProps): null => {
  useAutoOverlayStack(props);
  useDismissBehavior(props);

  useIsomorphicLayoutEffect(() => {
    if (!props.open) {
      return;
    }

    props.contentRef.current
      ?.querySelector<HTMLElement>(
        ':is([role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]):not([aria-disabled="true"])',
      )
      ?.focus();
  }, [props.contentRef, props.open]);

  return null;
};

FallbackMenuBehavior.displayName = 'FallbackMenuBehavior';

export type FallbackListboxBehaviorProps = DismissBehaviorProps;

export const FallbackListboxBehavior = (props: FallbackListboxBehaviorProps): null => {
  useAutoOverlayStack(props);
  useDismissBehavior(props);
  return null;
};

FallbackListboxBehavior.displayName = 'FallbackListboxBehavior';

export type FallbackTooltipBehaviorProps = {
  contentRef: ElementRef;
  onDismiss: (event: Event) => void;
  targetDocument: Document | undefined;
  triggerRef: ElementRef;
  visible: boolean;
};

export const FallbackTooltipBehavior = (props: FallbackTooltipBehaviorProps): null => {
  const { contentRef, onDismiss, targetDocument, triggerRef, visible } = props;

  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: onDismiss,
    refs: [triggerRef, contentRef],
    disabled: !visible,
  });

  const dismiss = useEventCallback(onDismiss);

  React.useEffect(() => {
    if (!visible || !targetDocument) {
      return;
    }

    tooltipEntries.get(targetDocument)?.dismiss(new Event('tooltipPeerDismiss'));
    const entry = { dismiss };
    tooltipEntries.set(targetDocument, entry);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === Escape && !event.defaultPrevented) {
        event.preventDefault();
        dismiss(event);
      }
    };
    const onVisibilityChange = () => {
      if (targetDocument.visibilityState === 'hidden') {
        dismiss(new Event('visibilitychange'));
      }
    };

    targetDocument.addEventListener('keydown', onKeyDown, true);
    targetDocument.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (tooltipEntries.get(targetDocument) === entry) {
        tooltipEntries.delete(targetDocument);
      }
      targetDocument.removeEventListener('keydown', onKeyDown, true);
      targetDocument.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [dismiss, targetDocument, visible]);

  return null;
};

FallbackTooltipBehavior.displayName = 'FallbackTooltipBehavior';

export type FallbackDialogBehaviorProps = {
  contentRef: ElementRef;
  lockScroll: boolean;
  modal: boolean;
  onDismiss: (event: Event) => void;
  open: boolean;
  targetDocument: Document | undefined;
};

export const FallbackDialogBehavior = (props: FallbackDialogBehaviorProps): null => {
  useFocusBehavior({
    contentRef: props.contentRef,
    open: props.open,
    targetDocument: props.targetDocument,
    trapFocus: props.modal,
  });

  React.useEffect(() => {
    const targetDocument = props.targetDocument;
    if (!props.open || !props.lockScroll || !targetDocument) {
      return;
    }

    lockDocumentScroll(targetDocument);
    return () => unlockDocumentScroll(targetDocument);
  }, [props.lockScroll, props.open, props.targetDocument]);

  useIsomorphicLayoutEffect(() => {
    const content = props.contentRef.current;
    if (!props.open || !content || !props.targetDocument) {
      return;
    }

    const stack = dialogStacks.get(props.targetDocument) ?? [];
    if (!dialogStacks.has(props.targetDocument)) {
      dialogStacks.set(props.targetDocument, stack);
    }
    stack.push(content);

    return () => {
      const index = stack.indexOf(content);
      if (index !== -1) {
        stack.splice(index, 1);
      }
    };
  }, [props.contentRef, props.open, props.targetDocument]);

  const onKeyDown = useEventCallback((event: KeyboardEvent) => {
    if (
      event.key === Escape &&
      !event.defaultPrevented &&
      props.targetDocument &&
      dialogStacks.get(props.targetDocument)?.at(-1) === props.contentRef.current
    ) {
      event.preventDefault();
      props.onDismiss(event);
    }
  });

  React.useEffect(() => {
    if (!props.open || !props.targetDocument) {
      return;
    }

    props.targetDocument.addEventListener('keydown', onKeyDown, true);
    return () => props.targetDocument?.removeEventListener('keydown', onKeyDown, true);
  }, [onKeyDown, props.open, props.targetDocument]);

  return null;
};

FallbackDialogBehavior.displayName = 'FallbackDialogBehavior';

/**
 * Implementation loaded only for documents that cannot use the complete native
 * overlay runtime.
 */
export const fallbackRuntime = {
  FallbackDialogBehavior,
  FallbackListboxBehavior,
  FallbackMenuBehavior,
  FallbackPopoverBehavior,
  FallbackTooltipBehavior,
  Portal,
  positioning,
};

export type OverlayFallbackRuntime = typeof fallbackRuntime;
