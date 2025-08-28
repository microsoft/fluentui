//
// Dev utils to detect if nodes have "autoFocus" props.
//

import { getReactFiberFromNode } from './getReactFiberFromNode';

/**
 * Detects if a passed HTML node has "autoFocus" prop on a React's fiber. Is needed as React handles autofocus behavior
 * in React DOM and will not pass "autoFocus" to an actual HTML.
 *
 * @param node
 */
function hasAutofocusProp(node: Node): boolean {
  // https://github.com/facebook/react/blob/848bb2426e44606e0a55dfe44c7b3ece33772485/packages/react-dom/src/client/ReactDOMHostConfig.js#L157-L166
  const isAutoFocusableElement =
    node.nodeName === 'BUTTON' ||
    node.nodeName === 'INPUT' ||
    node.nodeName === 'SELECT' ||
    node.nodeName === 'TEXTAREA';

  if (isAutoFocusableElement) {
    return !!getReactFiberFromNode(node)?.pendingProps.autoFocus;
  }

  return false;
}

export function hasAutofocusFilter(node: Node) {
  return hasAutofocusProp(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
