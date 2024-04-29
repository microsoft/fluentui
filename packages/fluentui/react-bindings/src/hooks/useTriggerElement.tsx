import { Ref } from '@fluentui/react-component-ref';
import * as React from 'react';
import * as ReactIs from 'react-is';

import { childrenExist } from '../utils/childrenExist';

type UseTriggerElementOptions = {
  children?: React.ReactNode;
  trigger?: React.ReactElement;
};

// https://github.com/facebook/react/blob/c4e0768d7487a9359b74986e3b07841d2520f593/packages/react-dom/src/events/getListener.js#L15-L22
function isDisabledInteractive(node: Node): boolean {
  return (
    (node.nodeName === 'BUTTON' ||
      node.nodeName === 'INPUT' ||
      node.nodeName === 'SELECT' ||
      node.nodeName === 'TEXTAREA') &&
    (node as HTMLButtonElement).disabled
  );
}

function isInteractiveFilter(node: Node) {
  return isDisabledInteractive(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}

/**
 * Performs consistent checks for components that are using `trigger` pattern (`Tooltip`, `Popup`). Ensures that
 * `children` or `trigger` props will always pass a valid React element to what additional props and handlers can
 * be applied.
 */
export function useTriggerElement(props: UseTriggerElementOptions): React.ReactElement | null {
  const trigger = childrenExist(props.children) ? props.children : props.trigger;
  const element = trigger ? (React.Children.only(trigger) as React.ReactElement) : null;

  // An exception should not be thrown in tests as components might be rendered without styles
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    if (ReactIs.isFragment(element)) {
      throw new Error(
        'useTriggerElement(): A "React.Fragment" cannot be used as a "trigger" as it will be impossible to spread props on it',
      );
    }

    // Hooks are used only for dev mode validations and will be removed in production builds
    /* eslint-disable react-hooks/rules-of-hooks */

    const ref = React.useRef<HTMLElement>() as React.RefObject<HTMLElement | HTMLButtonElement>;

    React.useEffect(() => {
      if (ref.current) {
        if (isDisabledInteractive(ref.current)) {
          // eslint-disable-next-line no-console
          console.warn(
            [
              'useTriggerElement(): Disabled elements should used as a "trigger" accurately as it may lead to ',
              'unexpected behavior as pointer events are ignored on disabled elements. Please wrap your "trigger" with',
              'an additional element like a "div" if you need to show tooltips or popups on disabled elements, an',
              'example is available in docs:',
              'https://fluentsite.z22.web.core.windows.net/components/tooltip/definition#usage-disabled-trigger',
            ].join(' '),
          );
        }

        const treeWalker = ref.current.ownerDocument?.createTreeWalker(ref.current, NodeFilter.SHOW_ELEMENT, {
          acceptNode: isInteractiveFilter,
        });
        while (treeWalker?.nextNode()) {
          const node = treeWalker.currentNode;
          const nodeStyles = node.ownerDocument?.defaultView?.getComputedStyle(node as Element);

          if (nodeStyles?.pointerEvents !== 'none') {
            throw new Error(
              [
                'useTriggerElement(): A disabled element should have explicit "pointer-events: "none" in its styles',
                'due a bug in Chrome that breaks "onMouseLeave" event in React:',
                'https://github.com/facebook/react/issues/19692',
              ].join(' '),
            );
          }
        }
      }
    }, []);

    return element ? (
      /* Required as components may call handlers via `trigger.props`, Ref will pass unhandled props down */
      <Ref {...(element as React.ReactElement).props} innerRef={ref}>
        {element}
      </Ref>
    ) : null;
  }

  return element;
}
