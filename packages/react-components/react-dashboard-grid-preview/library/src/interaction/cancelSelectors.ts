import { composedContains, getComposedParent } from './domGeometry';
import { dashboardGridDataAttributes } from './types';

export type DashboardGridPointerCancelPredicate = (
  element: HTMLElement,
  event: Event,
  composedPath: readonly EventTarget[],
) => boolean;

export type DashboardGridPointerHandle =
  | HTMLElement
  | string
  | ((element: HTMLElement, event: Event, composedPath: readonly EventTarget[]) => boolean);

export type DashboardGridPointerCancelRule = string | DashboardGridPointerCancelPredicate;

export type DashboardGridPointerCancellationOptions = {
  itemElement: HTMLElement;
  handle?: DashboardGridPointerHandle | null;
  cancel?: DashboardGridPointerCancelRule | readonly DashboardGridPointerCancelRule[];
  ignoreItemElement?: boolean;
};

const isHTMLElementLike = (target: EventTarget | null | undefined): target is HTMLElement =>
  typeof target === 'object' &&
  target !== null &&
  'nodeType' in target &&
  (target as Node).nodeType === 1 &&
  'matches' in target;

const matchesSelector = (element: HTMLElement, selector: string): boolean => {
  try {
    return element.matches(selector);
  } catch {
    return false;
  }
};

export const getDashboardGridComposedPath = (event: Event): readonly EventTarget[] => {
  const composedPath = event.composedPath?.();
  if (composedPath && composedPath.length > 0) {
    return composedPath;
  }

  const path: EventTarget[] = [];
  let current = isHTMLElementLike(event.target) ? event.target : null;
  while (current) {
    path.push(current);
    current = getComposedParent(current);
  }

  return path;
};

const getCurrentItemPath = (
  path: readonly EventTarget[],
  itemElement: HTMLElement,
): { elements: HTMLElement[]; nestedItemEncountered: boolean } => {
  const elements: HTMLElement[] = [];
  let nestedItemEncountered = false;

  for (const target of path) {
    if (!isHTMLElementLike(target)) {
      continue;
    }

    if (target === itemElement) {
      return { elements: [...elements, target], nestedItemEncountered };
    }

    if (
      target.hasAttribute(dashboardGridDataAttributes.item) &&
      target !== itemElement &&
      composedContains(itemElement, target)
    ) {
      nestedItemEncountered = true;
    }

    elements.push(target);
  }

  return { elements, nestedItemEncountered };
};

const matchesHandle = (
  element: HTMLElement,
  handle: DashboardGridPointerHandle,
  event: Event,
  path: readonly EventTarget[],
): boolean => {
  if (typeof handle === 'string') {
    return matchesSelector(element, handle);
  }

  if (typeof handle === 'function') {
    return handle(element, event, path);
  }

  return element === handle || composedContains(handle, element);
};

const matchesCancelRule = (
  element: HTMLElement,
  rule: DashboardGridPointerCancelRule,
  event: Event,
  path: readonly EventTarget[],
): boolean => (typeof rule === 'string' ? matchesSelector(element, rule) : rule(element, event, path));

const isDefaultInteractiveTarget = (element: HTMLElement): boolean => {
  const tagName = element.tagName.toLowerCase();
  if (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'button' ||
    tagName === 'select' ||
    tagName === 'option'
  ) {
    return true;
  }

  return (
    element.isContentEditable ||
    element.getAttribute('contenteditable') === '' ||
    element.getAttribute('contenteditable') === 'true' ||
    element.hasAttribute(dashboardGridDataAttributes.resizeHandle)
  );
};

export const shouldCancelDashboardGridPointerStart = (
  event: Event,
  options: DashboardGridPointerCancellationOptions,
): boolean => {
  const path = getDashboardGridComposedPath(event);
  const { elements, nestedItemEncountered } = getCurrentItemPath(path, options.itemElement);
  if (elements.length === 0 || nestedItemEncountered) {
    return true;
  }

  const cancelRules: readonly DashboardGridPointerCancelRule[] =
    typeof options.cancel === 'string' || typeof options.cancel === 'function'
      ? [options.cancel]
      : options.cancel ?? [];
  if (cancelRules.some(rule => elements.some(element => matchesCancelRule(element, rule, event, path)))) {
    return true;
  }

  if (options.handle) {
    return !elements.some(element => matchesHandle(element, options.handle!, event, path));
  }

  return elements.some(
    element =>
      (!options.ignoreItemElement || element !== options.itemElement) &&
      isDefaultInteractiveTarget(element),
  );
};
