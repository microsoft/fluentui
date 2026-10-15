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
import { getListFocusableElements } from '../listNavigation';
import { useListNavigationMode } from '../listNavigationContext';
import { toDataAttributeValue } from '../../../utils';

const editableTargetSelector =
  'input:not([type="checkbox" i]):not([type="radio" i]):not([type="button" i]):not([type="submit" i]):not([type="reset" i]):not([type="image" i]):not([type="hidden" i]), ' +
  'textarea, select, [contenteditable=""], [contenteditable="true" i], [contenteditable="plaintext-only" i], ' +
  'audio[controls], video[controls], iframe, object';

/**
 * Returns the state for a ListItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderListItem`.
 */
export const useListItem = (props: ListItemProps, ref: React.Ref<HTMLLIElement | HTMLDivElement>): ListItemState => {
  const baseState = useListItemBase_unstable(props, ref);
  const navigationMode = useListNavigationMode();
  const { dir } = useFluent_unstable();
  const onKeyDown: React.KeyboardEventHandler<HTMLElement> | undefined = baseState.root.onKeyDown;

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = useEventCallback(event => {
    onKeyDown?.(event);

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
    if (target !== root && key !== Escape && target.closest(editableTargetSelector)) {
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
      return;
    }

    if (key === Escape && target !== root) {
      root.focus();
      event.preventDefault();
      return;
    }

    if (target !== root && key !== ArrowUp && key !== ArrowDown) {
      return;
    }

    const rows = (list ? getListFocusableElements(list) : []).filter(
      element => element.hasAttribute('data-navigable') && element.closest('[data-list]') === list,
    );
    let step: number;
    let start: number;

    switch (key) {
      case ArrowUp:
        step = -1;
        start = rows.indexOf(root) - 1;
        break;
      case ArrowDown:
        step = 1;
        start = rows.indexOf(root) + 1;
        break;
      case Home:
      case PageUp:
        step = 1;
        start = 0;
        break;
      case End:
      case PageDown:
        step = -1;
        start = rows.length - 1;
        break;
      default:
        return;
    }

    for (let index = start; index >= 0 && index < rows.length; index += step) {
      rows[index].focus();
      if (rows[index].matches(':focus')) {
        event.preventDefault();
        return;
      }
    }

    root.focus();
    event.preventDefault();
  });

  return {
    ...baseState,
    root: {
      ...baseState.root,
      'data-selectable': toDataAttributeValue(baseState.selectable),
      'data-navigable': toDataAttributeValue(baseState.navigable),
      'data-selected': toDataAttributeValue(baseState.root['aria-selected']),
      'data-disabled': toDataAttributeValue(baseState.root['aria-disabled']),
      ...(navigationMode === 'composite' && { focusgroup: undefined, onKeyDown: handleKeyDown }),
    },
  };
};
