import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';
import type { UseOnClickOrScrollOutsideOptions } from '@fluentui/react-utilities';

/**
 * Name of the custom event
 */
export const MENU_ENTER_EVENT = 'fuimenuenter';

/**
 * This hook works similarly to @see {useOnClickOutside}
 *
 * Problem: Trying to behave the same as system menus:
 * When the mouse leaves a stack of nested menus the stack should not dismiss.
 * However if the mouse leaves a stack of menus and enters a parent menu all its children menu should dismiss.
 *
 * We don't use the native mouseenter event because it would trigger too many times in the document
 * Instead, dispatch custom DOM event from the menu so that it can bubble
 * Each nested menu can use the listener to check if the event is from a child or parent menu
 */
export const useOnMenuMouseEnter = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled } = options;

  // Keep mouse event here because this is essentially a custom 'mouseenter' event
  const listener = useEventCallback((ev: MouseEvent) => {
    const popoverRef = refs[0];
    const someMenuPopover = ev.target as HTMLElement;

    // someMenu is a child -> will always be contained because of vParents
    // someMenu is a parent -> will always not be contained because no vParent
    // someMenu is the current popover -> it will contain itself
    const isOutsidePopover = !elementContains(popoverRef.current ?? null, someMenuPopover);
    if (isOutsidePopover && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (element == null) {
      return;
    }

    /**
     * Because `addEventListener` type override falls back to 2nd definition (evt name is unknown string literal)
     * evt is being typed as a base class of MouseEvent -> `Event`.
     * This type is used to override `listener` calls to make TS happy
     */

    type ListenerOverride = (evt: Event) => void;

    if (!disabled) {
      element.addEventListener(MENU_ENTER_EVENT, listener as ListenerOverride);
    }

    return () => {
      element.removeEventListener(MENU_ENTER_EVENT, listener as ListenerOverride);
    };
  }, [listener, element, disabled]);
};

/**
 * Dispatches the custom MouseEvent enter event. Similar to calling `el.click()`
 * @param el element for the event target
 * @param nativeEvent the native mouse event this is mapped to
 */
export const dispatchMenuEnterEvent = (el: HTMLElement, nativeEvent: MouseEvent) => {
  el.dispatchEvent(new CustomEvent(MENU_ENTER_EVENT, { bubbles: true, detail: { nativeEvent } }));
};
