import * as React from 'react';
import { isHTMLElement } from '@fluentui/react-utilities';

export function isHTMLElementWithRole(node: Node | null, role: React.AriaRole): node is HTMLElement {
  return isHTMLElement(node) && node.getAttribute('role') === role;
}
