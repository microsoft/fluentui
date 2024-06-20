import * as React from 'react';

/**
 * Checks if the given element has children.
 *
 * @param element - The element to check.
 * @returns True if the element has children, false otherwise.
 */
function hasChildren(
  element: React.ReactNode,
): element is React.ReactElement<{ children: React.ReactNode | React.ReactNode[] }> {
  return React.isValidElement<{ children?: React.ReactNode[] }>(element) && !!element.props.children;
}

/**
 * Converts a child element to a string.
 *
 * @param child - The child element to convert.
 * @returns The string representation of the child element.
 */
function childToString(child?: React.ReactNode): string {
  if (typeof child === 'undefined' || child === null || typeof child === 'boolean') {
    return '';
  }

  if (JSON.stringify(child) === '{}') {
    return '';
  }

  return (child as number | string).toString();
}

/**
 * Converts React children to a string.
 *
 * @param children - The React children to convert.
 * @returns The string representation of the React children.
 */
export function childrenToString(children: React.ReactNode | React.ReactNode[]): string {
  if (!(children instanceof Array) && !React.isValidElement(children)) {
    return childToString(children);
  }

  return React.Children.toArray(children).reduce<string>((text, child) => {
    let newText = '';

    if (hasChildren(child)) {
      newText = childrenToString(child.props.children);
    } else if (React.isValidElement(child)) {
      newText = '';
    } else {
      newText = childToString(child);
    }

    return text.concat(newText);
  }, '');
}
