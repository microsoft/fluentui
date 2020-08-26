import { Ref } from '@fluentui/react-component-ref';
import * as React from 'react';
import * as ReactIs from 'react-is';

import { childrenExist } from '../utils/childrenExist';

type UseTriggerOptions = {
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

export function useTrigger(props: UseTriggerOptions): React.ReactElement | null {
  const trigger = childrenExist(props.children) ? props.children : props.trigger;

  if (!trigger) {
    return null;
  }

  const element = React.Children.only(trigger);

  if (!React.isValidElement(element)) {
    throw new Error('useTrigger(): An invalid value was passed, please pass a valid React element as a trigger');
  }

  if (ReactIs.isFragment(element)) {
    throw new Error(
      'useTrigger(): A "React.Fragment" cannot be used as a "trigger" as it will be impossible to spread props on it',
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    const ref = React.useRef<HTMLElement>() as React.RefObject<HTMLElement | HTMLButtonElement>;

    React.useEffect(() => {
      if (ref.current) {
        if (isDisabledInteractive(ref.current)) {
          throw new Error(
            [
              'useTrigger(): Disabled elements can not be used as a "trigger" as it may lead to unexpected behavior as',
              'pointer events are ignored on disabled elements.',
              'Please wrap your "trigger" with an additional element like a "div", an example is available in docs:',
              'https://fluentsite.z22.web.core.windows.net/components/tooltip/definition#usage-disabled-trigger',
            ].join(' '),
          );
        }

        const treeWalker = document.createTreeWalker(ref.current, NodeFilter.SHOW_ELEMENT, {
          acceptNode: isInteractiveFilter,
        });

        while (treeWalker.nextNode()) {
          const node = treeWalker.currentNode;
          const nodeStyles = node.ownerDocument?.defaultView?.getComputedStyle(node as Element);

          if (nodeStyles?.pointerEvents !== 'none') {
            throw new Error(
              [
                'useTrigger(): A disabled element should have explicit "pointer-events: "none" in its styles due a bug',
                'in Chrome that breaks "onMouseLeave" event in React: https://github.com/facebook/react/issues/19692',
              ].join(' '),
            );
          }
        }
      }
    }, []);

    return <Ref innerRef={ref}>{element}</Ref>;
  }

  return element;
}
