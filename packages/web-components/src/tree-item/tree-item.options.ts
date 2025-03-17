import { ValuesOf } from '../utils/typings.js';
import { BaseTreeItem } from './tree-item.base.js';

export const TreeItemAppearance = {
  subtle: 'subtle',
  subtleAlpha: 'subtle-alpha',
  transparent: 'transparent',
} as const;

export type TreeItemAppearance = ValuesOf<typeof TreeItemAppearance>;

export const TreeItemSize = {
  small: 'small',
  medium: 'medium',
} as const;

export type TreeItemSize = ValuesOf<typeof TreeItemSize>;

/**
 * Predicate function that determines if the element should be considered an tree-item.
 *
 * @param element - The element to check.
 * @param tagName - The tag name to check.
 * @returns true if the element is a dropdown.
 * @public
 */
export function isTreeItem(element?: Node | null, tagName: string = '-tree-item'): element is BaseTreeItem {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith(tagName);
}
