import { dashboardGridDataAttributes } from './types';
import type { DashboardGridPixelRect } from './types';

const ariaRelationshipAttributes = [
  'aria-activedescendant',
  'aria-controls',
  'aria-describedby',
  'aria-details',
  'aria-errormessage',
  'aria-flowto',
  'aria-labelledby',
  'aria-owns',
] as const;

const focusableSelector = [
  'a[href]',
  'area[href]',
  'button',
  'input',
  'select',
  'textarea',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]',
].join(',');

const isHTMLElementLike = (value: Element): value is HTMLElement => 'style' in value && 'tabIndex' in value;

/**
 * Makes caller-rendered dedicated preview content inert and removes identifiers
 * that could duplicate the accessible widget subtree.
 */
export const sanitizeDashboardGridDragPreview = (preview: HTMLElement): void => {
  preview.setAttribute('aria-hidden', 'true');
  preview.setAttribute('inert', '');
  preview.tabIndex = -1;

  const elements = [preview, ...Array.from(preview.querySelectorAll<HTMLElement>('*'))];
  for (const element of elements) {
    element.removeAttribute('id');
    for (const attribute of ariaRelationshipAttributes) {
      element.removeAttribute(attribute);
    }
  }

  for (const element of Array.from(preview.querySelectorAll<HTMLElement>(focusableSelector))) {
    element.tabIndex = -1;
    const disableableElement = element as HTMLElement & { disabled?: boolean };
    if (typeof disableableElement.disabled === 'boolean') {
      disableableElement.disabled = true;
    }
    if (element.hasAttribute('contenteditable')) {
      element.setAttribute('contenteditable', 'false');
    }
    if (isHTMLElementLike(element)) {
      element.style.pointerEvents = 'none';
    }
  }
};

export type DashboardGridDragPreviewController = {
  element: HTMLElement;
  update(rect: DashboardGridPixelRect): void;
  destroy(): void;
};

/**
 * Creates empty preview chrome. Content must be rendered specifically for the
 * preview; the active item's DOM subtree is never cloned.
 */
export const createDashboardGridDragPreview = (options: {
  targetDocument: Document;
  host: HTMLElement | ShadowRoot;
  className?: string;
  render?: (container: HTMLElement) => void;
}): DashboardGridDragPreviewController => {
  const element = options.targetDocument.createElement('div');
  element.setAttribute(dashboardGridDataAttributes.preview, '');
  element.setAttribute('aria-hidden', 'true');
  element.setAttribute('inert', '');
  element.tabIndex = -1;
  element.style.position = 'fixed';
  element.style.insetInlineStart = '0';
  element.style.top = '0';
  element.style.pointerEvents = 'none';

  if (options.className) {
    element.className = options.className;
  }

  options.render?.(element);
  sanitizeDashboardGridDragPreview(element);
  options.host.appendChild(element);

  return {
    element,
    update: rect => {
      element.style.width = `${rect.width}px`;
      element.style.height = `${rect.height}px`;
      element.style.transform = `translate3d(${rect.x}px, ${rect.y}px, 0)`;
    },
    destroy: () => {
      element.remove();
    },
  };
};
