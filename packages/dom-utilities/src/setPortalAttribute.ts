export const DATA_PORTAL_ATTRIBUTE = 'data-portal-element';

/**
 * Identify element as a portal by setting an attribute.
 * @param element - Element to mark as a portal.
 */
export function setPortalAttribute(element: HTMLElement): void {
  element.setAttribute(DATA_PORTAL_ATTRIBUTE, 'true');
}
