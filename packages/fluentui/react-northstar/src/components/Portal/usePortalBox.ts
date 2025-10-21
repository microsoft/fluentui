import * as React from 'react';

const useInsertionEffect =
  // eslint-disable-next-line no-useless-concat
  ((React as never)['useInsertion' + 'Effect'] as typeof React.useLayoutEffect | undefined) ?? React.useLayoutEffect;

export type UsePortalBoxOptions = {
  className?: string;
  rtl: boolean;
  targetNode: HTMLElement | undefined;
};

const initializeElementFactory = () => {
  let currentElement: HTMLDivElement | undefined = undefined;

  function get(targetRoot: HTMLElement, forceCreation: boolean): HTMLDivElement | undefined {
    if (currentElement) {
      return currentElement;
    }

    if (forceCreation) {
      currentElement = targetRoot.ownerDocument.createElement('div');
      targetRoot.appendChild(currentElement);
    }

    return currentElement;
  }

  function dispose() {
    if (currentElement) {
      currentElement.remove();
      currentElement = undefined;
    }
  }

  return {
    get,
    dispose,
  };
};

/**
 * This is a modern element factory for React 18 and above. It is safe for concurrent rendering.
 *
 * It abuses the fact that React will mount DOM once (unlike hooks), so by using a proxy we can intercept:
 * - the `remove()` method (we call it in `useEffect()`) and remove the element only when the portal is unmounted
 * - all other methods (and properties) will be called by React once a portal is mounted
 */
export const usePortalBox = (options: UsePortalBoxOptions): HTMLDivElement | null => {
  const { className, rtl, targetNode } = options;
  const [elementFactory] = React.useState(initializeElementFactory);

  const elementProxy = React.useMemo(() => {
    if (targetNode === undefined) {
      return null;
    }

    return new Proxy({} as HTMLDivElement, {
      get(_, property: keyof HTMLDivElement) {
        // Heads up!
        // `createPortal()` performs a check for `nodeType` property to determine if the mount node is a valid DOM node
        // before mounting the portal. We hardcode the value to `Node.ELEMENT_NODE` to pass this check and avoid
        // premature node creation
        if (property === 'nodeType') {
          return Node.ELEMENT_NODE;
        }

        // Heads up!
        // We intercept the `remove()` method to remove the mount node only when portal has been unmounted already.
        if (property === 'remove') {
          const targetElement = elementFactory.get(targetNode, false);

          if (targetElement) {
            // If the mountElement has children, the portal is still mounted, otherwise we can dispose of it
            const portalHasNoChildren = targetElement.childNodes.length === 0;

            if (portalHasNoChildren) {
              elementFactory.dispose();
            }
          }

          return () => {
            // Always return a no-op function to avoid errors in the code
          };
        }

        const targetElement = elementFactory.get(targetNode, true);
        const targetProperty = targetElement ? targetElement[property] : undefined;

        if (typeof targetProperty === 'function') {
          return targetProperty.bind(targetElement);
        }

        return targetProperty;
      },

      set(_, property: keyof HTMLDivElement | '_virtual' | 'focusVisible', value) {
        const ignoredProperty = property === '_virtual' || property === 'focusVisible';

        // We should use the `elementFactory.get(targetNode, !ignoredProperty)`,
        // but TypeScript requires a literal `true` or `false` for the overload signature.
        // This workaround ensures the correct overload is called and avoids TypeScript errors.
        const targetElement = ignoredProperty
          ? elementFactory.get(targetNode, false)
          : elementFactory.get(targetNode, true);

        if (ignoredProperty && !targetElement) {
          // We ignore the `_virtual` and `focusVisible` properties to avoid conflicts with the proxy
          return true;
        }

        if (targetElement) {
          Object.assign(targetElement, { [property]: value });
          return true;
        }

        return false;
      },
    });
  }, [elementFactory, targetNode]);

  useInsertionEffect!(() => {
    if (!elementProxy) {
      return () => {};
    }

    const classesToApply = className.split(' ').filter(Boolean);

    elementProxy.classList.add(...classesToApply);
    elementProxy.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    elementProxy.setAttribute('data-portal-node', 'true');

    return () => {
      elementProxy.classList.remove(...classesToApply);
      elementProxy.removeAttribute('dir');
    };
  }, [className, elementProxy, rtl]);

  React.useEffect(() => {
    return () => {
      elementProxy?.remove();
    };
  }, [elementProxy]);

  return elementProxy;
};
