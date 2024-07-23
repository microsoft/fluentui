import { isHTMLElement } from '@fluentui/react-utilities';
import type { PortalProps } from '../Portal';

/**
 * The function that normalizes the `mountNode` prop into an object with element and className props.
 *
 * @param mountNode - an HTML element or an object with props
 */
export function toMountNodeProps(mountNode: PortalProps['mountNode']): {
  element?: HTMLElement | null;
  className?: string;
} {
  if (isHTMLElement(mountNode)) {
    return { element: mountNode };
  }

  if (typeof mountNode === 'object') {
    if (mountNode === null) {
      return { element: null };
    }

    return mountNode;
  }

  return {};
}
