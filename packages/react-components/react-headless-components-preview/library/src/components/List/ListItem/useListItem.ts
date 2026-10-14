'use client';

import type * as React from 'react';
import { useListItemBase_unstable } from '@fluentui/react-list';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { getRTLSafeKey, isHTMLElement, useEventCallback } from '@fluentui/react-utilities';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  End,
  Escape,
  Home,
  PageDown,
  PageUp,
} from '@fluentui/keyboard-keys';

import type { ListItemProps, ListItemState } from './ListItem.types';
import { getListFocusableElements, useListNavigationMode } from '../listNavigationContext';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a ListItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderListItem`.
 */
export const useListItem = (props: ListItemProps, ref: React.Ref<HTMLLIElement | HTMLDivElement>): ListItemState => {
  const baseState = useListItemBase_unstable(props, ref);
  const navigationMode = useListNavigationMode();
  const { dir } = useFluent_unstable();

  const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(event => {
    baseState.root.onKeyDown?.(event);

    if (
      event.defaultPrevented ||
      navigationMode !== 'composite' ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return;
    }

    const root = event.currentTarget;
    const target = event.target;
    const list = root.closest<HTMLElement>('[data-list]');
    if (
      !isHTMLElement(target) ||
      target.closest('[data-navigable]') !== root ||
      target.closest('[data-list]') !== list
    ) {
      return;
    }

    const key = getRTLSafeKey(event.key, dir);
    if (
      target !== root &&
      key !== Escape &&
      target.closest(
        'input:not([type="checkbox"]):not([type="radio"]), textarea, select, ' +
          '[contenteditable=""], [contenteditable="true" i], [contenteditable="plaintext-only" i], ' +
          'audio[controls], video[controls], iframe, object',
      )
    ) {
      return;
    }

    if (key === ArrowRight || key === ArrowLeft) {
      const controls = getListFocusableElements(root).filter(
        element => element.closest('[data-navigable]') === root && element.closest('[data-list]') === list,
      );
      const step = key === ArrowRight ? 1 : -1;
      const start = target === root ? -1 : controls.indexOf(target);

      for (let index = start + step; index >= 0 && index < controls.length; index += step) {
        controls[index].focus();
        if (controls[index].matches(':focus')) {
          event.preventDefault();
          return;
        }
      }

      if (key === ArrowLeft && target !== root) {
        root.focus();
        event.preventDefault();
      }
    } else if (
      key === ArrowUp ||
      key === ArrowDown ||
      (target !== root && key === Escape) ||
      (target === root && (key === Home || key === End || key === PageUp || key === PageDown))
    ) {
      if (key !== Escape) {
        const rows = (list ? getListFocusableElements(list) : []).filter(
          element => element.hasAttribute('data-navigable') && element.closest('[data-list]') === list,
        );
        const step = key === ArrowDown || key === Home || key === PageUp ? 1 : -1;
        const start =
          key === Home || key === PageUp
            ? 0
            : key === End || key === PageDown
            ? rows.length - 1
            : rows.indexOf(root) + step;

        for (let index = start; index >= 0 && index < rows.length; index += step) {
          rows[index].focus();
          if (rows[index].matches(':focus')) {
            event.preventDefault();
            return;
          }
        }
      }

      root.focus();
      event.preventDefault();
    }
  });

  return {
    ...baseState,
    root: {
      ...baseState.root,
      'data-selectable': toDataAttributeValue(baseState.selectable),
      'data-navigable': toDataAttributeValue(baseState.navigable),
      'data-selected': toDataAttributeValue(baseState.root['aria-selected']),
      'data-disabled': toDataAttributeValue(baseState.selectable && baseState.disabled),
      ...(navigationMode === 'composite' && { focusgroup: undefined, onKeyDown: handleKeyDown }),
    },
  };
};
