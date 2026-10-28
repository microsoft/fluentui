'use client';

import * as React from 'react';
import {
  calculateListRole,
  useListBase_unstable,
  useListContextValues_unstable,
  validateListItemElement,
} from '@fluentui/react-list';
import { isSlot, SLOT_ELEMENT_TYPE_SYMBOL, useEventCallback, useMergedRefs } from '@fluentui/react-utilities';

import type { ListContextValues, ListProps, ListState } from './List.types';
import { getListFocusableElements, useCompositeListNavigation } from './listNavigation';
import { toDataAttributeValue } from '../../utils';

export { useListContext_unstable as useListContext } from '@fluentui/react-list';

/**
 * Returns the state for a List component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderList`.
 */
export const useList = (
  props: ListProps,
  ref: React.Ref<HTMLDivElement | HTMLUListElement | HTMLOListElement>,
): ListState => {
  const baseState = useListBase_unstable(props, ref);
  const rootRef = React.useRef<HTMLDivElement | HTMLUListElement | HTMLOListElement>(null);
  const mergedRef = useMergedRefs(baseState.root.ref, rootRef);
  const onCompositeFocus = useCompositeListNavigation(baseState.navigationMode, rootRef);
  const onFocusCapture: React.FocusEventHandler<HTMLElement> | undefined = baseState.root.onFocusCapture;
  const handleFocusCapture: React.FocusEventHandler<HTMLElement> = useEventCallback(event => {
    onFocusCapture?.(event);
    onCompositeFocus(event);
  });
  const validateListItem = useEventCallback((element: HTMLElement) => {
    if (baseState.navigationMode !== 'composite') {
      baseState.validateListItem(element);
      return;
    }
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    const root = baseState.root;
    if (!isSlot(root) || typeof root[SLOT_ELEMENT_TYPE_SYMBOL] !== 'string') {
      throw new Error('List must render an intrinsic root slot.');
    }
    validateListItemElement(element, {
      listRenderedAs: root[SLOT_ELEMENT_TYPE_SYMBOL],
      listRole: baseState.root.role || calculateListRole(baseState.navigationMode, !!baseState.selection),
      hasSelection: !!baseState.selection,
      hasFocusableChildren: getListFocusableElements(element).length > 0,
    });
  });

  const state: ListState = {
    ...baseState,
    validateListItem,
    root: {
      ...baseState.root,
      ref: mergedRef,
      'data-list': '',
      'data-navigation-mode': baseState.navigationMode,
      'data-selectable': toDataAttributeValue(!!baseState.selection),
      ...(baseState.navigationMode === 'items' && { focusgroup: 'toolbar block' }),
      // Composite navigation owns the tab stop and key handling; a focusgroup would compete with it.
      ...(baseState.navigationMode === 'composite' && {
        focusgroup: undefined,
        onFocusCapture: handleFocusCapture,
      }),
    },
  };

  return state;
};

/**
 * Maps the state of the list to the values that are passed through context to its children.
 */
export const useListContextValues: (state: ListState) => ListContextValues = useListContextValues_unstable;
