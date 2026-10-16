/**
 * Focus helpers for top-layer elements (popovers and dialogs).
 */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  'iframe',
  'summary',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
].join(',');

const LAYER_SELECTOR = '[popover], dialog';

/**
 * The closest top-layer element (popover or dialog) containing the element, including itself.
 */
const getClosestLayer = (element: Element): Element | null => element.closest(LAYER_SELECTOR);

const isVisible = (element: HTMLElement): boolean => {
  try {
    return element.checkVisibility?.({ checkVisibilityCSS: true }) ?? true;
  } catch {
    return true;
  }
};

const isRadio = (element: Element): element is HTMLInputElement =>
  element.tagName === 'INPUT' && (element as HTMLInputElement).type === 'radio' && !!(element as HTMLInputElement).name;

const isSameRadioGroup = (a: HTMLInputElement, b: HTMLInputElement): boolean => a.name === b.name && a.form === b.form;

/**
 * Whether two elements are the same tab stop: the same element, or radios of the same named group.
 */
export const isSameTabStop = (a: Element | null, b: Element | null): boolean =>
  !!a && !!b && (a === b || (isRadio(a) && isRadio(b) && isSameRadioGroup(a, b)));

/**
 * A named radio group is a single tab stop: its checked radio, or its first radio when none is checked.
 */
const collapseRadioGroups = (elements: HTMLElement[]): HTMLElement[] => {
  const tabStops: HTMLInputElement[] = [];

  elements.forEach(element => {
    if (!isRadio(element)) {
      return;
    }
    const index = tabStops.findIndex(radio => isSameRadioGroup(radio, element));
    if (index === -1) {
      tabStops.push(element);
    } else if (element.checked && !tabStops[index].checked) {
      tabStops[index] = element;
    }
  });

  return elements.filter(element => !isRadio(element) || tabStops.includes(element));
};

/**
 * Returns the tabbable elements inside the container in tab order: positive `tabindex` first (ascending),
 * then DOM order. A named radio group contributes one tab stop.
 *
 * Excludes elements that are disabled, `tabindex="-1"`, `aria-disabled`, hidden,
 * inert, or that belong to a nested popover or dialog.
 */
export const getFocusables = (container: HTMLElement): HTMLElement[] => {
  const tabbable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    element =>
      element.tabIndex >= 0 &&
      !(element as HTMLButtonElement).disabled &&
      element.getAttribute('aria-disabled') !== 'true' &&
      !element.closest('[aria-hidden="true"], [inert]') &&
      getClosestLayer(element) === container &&
      isVisible(element),
  );

  const positive = tabbable.filter(element => element.tabIndex > 0).sort((a, b) => a.tabIndex - b.tabIndex);
  const natural = tabbable.filter(element => element.tabIndex === 0);

  return collapseRadioGroups([...positive, ...natural]);
};

/**
 * Whether the element sits inside a popover or dialog nested within `layer`, rather than in `layer` itself.
 */
export const isInNestedLayer = (element: Element | null, layer: HTMLElement): boolean => {
  if (!element || !layer.contains(element)) {
    return false;
  }
  const closestLayer = getClosestLayer(element);
  return closestLayer !== null && closestLayer !== layer;
};

const isTextInput = (element: Element): boolean => {
  if ((element as HTMLElement).isContentEditable) {
    return true;
  }
  const role = element.getAttribute('role');
  if (role === 'combobox' || role === 'textbox' || element.tagName === 'TEXTAREA') {
    return true;
  }
  if (element.tagName !== 'INPUT') {
    return false;
  }
  const type = (element as HTMLInputElement).type;
  return ['text', 'search', 'email', 'url', 'tel', 'password', 'number'].includes(type);
};

/**
 * Whether focus is on a text input (combobox) that controls or owns the popup.
 * Focus must stay on the input in that case: the popup is navigated with `aria-activedescendant`.
 */
export const isComboboxControllingPopup = (targetDocument: Document, container: HTMLElement): boolean => {
  const activeElement = targetDocument.activeElement;
  if (!activeElement || !isTextInput(activeElement)) {
    return false;
  }

  const ids = `${activeElement.getAttribute('aria-controls') ?? ''} ${activeElement.getAttribute('aria-owns') ?? ''}`
    .split(/\s+/)
    .filter(Boolean);

  return ids.some(id => {
    const referenced = targetDocument.getElementById(id);
    return (
      !!referenced && (referenced === container || referenced.contains(container) || container.contains(referenced))
    );
  });
};

/**
 * Returns the element that should receive focus when a top-layer element with the given role opens,
 * or `null` when focus should not move.
 *
 * - `dialog` / `alertdialog`: `[autofocus]`, else the first tabbable element.
 * - `menu`: the first tabbable element, unless a combobox controls the popup.
 * - `listbox`: the selected option, else the first option, else the first tabbable element,
 *   unless a combobox controls the popup.
 * - other roles: focus does not move.
 */
export const getInitialFocusTarget = (container: HTMLElement, role: string | undefined): HTMLElement | null => {
  const targetDocument = container.ownerDocument;

  switch (role) {
    case 'dialog':
    case 'alertdialog':
      return (
        Array.from(container.querySelectorAll<HTMLElement>('[autofocus]')).find(
          element => getClosestLayer(element) === container,
        ) ??
        getFocusables(container)[0] ??
        null
      );

    case 'menu':
      return isComboboxControllingPopup(targetDocument, container) ? null : getFocusables(container)[0] ?? null;

    case 'listbox':
      if (isComboboxControllingPopup(targetDocument, container)) {
        return null;
      }
      return (
        container.querySelector<HTMLElement>('[role="option"][aria-selected="true"]') ??
        container.querySelector<HTMLElement>('[role="option"]') ??
        getFocusables(container)[0] ??
        null
      );

    default:
      return null;
  }
};
