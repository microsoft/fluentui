import * as React from 'react';
import { useEventCallback, UseOnClickOrScrollOutsideOptions } from '@fluentui/react-utilities';
import { elementContains } from '@fluentui/react-portal';

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
export const useOnMenuEnterOutside = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled } = options;

  // Keep mouse event here because this is essentially a custm 'mouseenter' event
  const listener = useEventCallback((ev: MouseEvent) => {
    const isOutside = refs.every(ref => !elementContains(ref.current || null, ev.target as HTMLElement));
    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    if (!disabled) {
      element?.addEventListener(MENU_ENTER_EVENT, listener);
    }

    return () => {
      element?.removeEventListener(MENU_ENTER_EVENT, listener);
    };
  }, [listener, element, disabled]);
};

/**
 * Dispatches the custom menu enter event. Similar to calling `el.click()`
 * @param el element for the event target
 */
export const dispatchMenuEnterEvent = (el: HTMLElement) => {
  el.dispatchEvent(new CustomEvent(MENU_ENTER_EVENT, { bubbles: true }));
};
