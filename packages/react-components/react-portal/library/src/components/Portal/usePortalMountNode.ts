import * as React from 'react';
import {
  useThemeClassName_unstable as useThemeClassName,
  useFluent_unstable as useFluent,
  usePortalMountNode as usePortalMountNodeContext,
} from '@fluentui/react-shared-contexts';
import { mergeClasses } from '@griffel/react';
import { useFocusVisible } from '@fluentui/react-tabster';

import { usePortalMountNodeStylesStyles } from './usePortalMountNodeStyles.styles';

const useInsertionEffect = (React as never)['useInsertion' + 'Effect'] as typeof React.useLayoutEffect | undefined;

export type UsePortalMountNodeOptions = {
  /**
   * Since hooks cannot be called conditionally use this flag to disable creating the node
   */
  disabled?: boolean;

  className?: string;
};

type UseElementFactoryOptions = {
  className: string;
  dir: string;
  disabled: boolean | undefined;
  focusVisibleRef: React.MutableRefObject<HTMLElement | null>;
  targetNode: HTMLElement | ShadowRoot | undefined;
};
type UseElementFactory = (options: UseElementFactoryOptions) => HTMLDivElement | null;

/**
 * Legacy element factory for React 17 and below. It's not safe for concurrent rendering.
 *
 * Creates a new element on a "document.body" to mount portals.
 */
const useLegacyElementFactory: UseElementFactory = options => {
  'use no memo';

  const { className, dir, focusVisibleRef, targetNode } = options;

  const targetElement = React.useMemo(() => {
    if (targetNode === undefined || options.disabled) {
      return null;
    }

    const element = targetNode.ownerDocument.createElement('div');
    targetNode.appendChild(element);

    return element;
  }, [targetNode, options.disabled]);

  // Heads up!
  // This useMemo() call is intentional for React 17 & below.
  //
  // We don't want to re-create the portal element when its attributes change. This also cannot not be done in an effect
  // because, changing the value of CSS variables after an initial mount will trigger interesting CSS side effects like
  // transitions.
  React.useMemo(() => {
    if (!targetElement) {
      return;
    }

    targetElement.className = className;
    targetElement.setAttribute('dir', dir);
    targetElement.setAttribute('data-portal-node', 'true');

    focusVisibleRef.current = targetElement;
  }, [className, dir, targetElement, focusVisibleRef]);

  React.useEffect(() => {
    return () => {
      targetElement?.remove();
    };
  }, [targetElement]);

  return targetElement;
};

const initializeElementFactory = () => {
  let currentElement: HTMLDivElement | undefined = undefined;

  function get(targetRoot: HTMLElement | ShadowRoot, forceCreation: boolean): HTMLDivElement | undefined {
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
const useModernElementFactory: UseElementFactory = options => {
  'use no memo';

  const { className, dir, focusVisibleRef, targetNode } = options;

  const [elementFactory] = React.useState(initializeElementFactory);

  const elementProxy = React.useMemo(() => {
    if (targetNode === undefined || options.disabled) {
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
  }, [elementFactory, targetNode, options.disabled]);

  useInsertionEffect!(() => {
    if (!elementProxy) {
      return;
    }

    const classesToApply = className.split(' ').filter(Boolean);

    elementProxy.classList.add(...classesToApply);
    elementProxy.setAttribute('dir', dir);
    elementProxy.setAttribute('data-portal-node', 'true');

    focusVisibleRef.current = elementProxy;

    return () => {
      elementProxy.classList.remove(...classesToApply);
      elementProxy.removeAttribute('dir');
    };
  }, [className, dir, elementProxy, focusVisibleRef]);

  React.useEffect(() => {
    return () => {
      elementProxy?.remove();
    };
  }, [elementProxy]);

  return elementProxy;
};

/**
 * Element factory based on the React version.
 *
 * React 17 and below:
 * - useLegacyElementFactory
 *
 * React 18 and above:
 * - useModernElementFactory
 */
const useElementFactory = useInsertionEffect ? useModernElementFactory : useLegacyElementFactory;

/**
 * Creates a new element on a "document.body" to mount portals.
 */
export const usePortalMountNode = (options: UsePortalMountNodeOptions): HTMLElement | null => {
  'use no memo';

  const { targetDocument, dir } = useFluent();
  const mountNode = usePortalMountNodeContext();

  const focusVisibleRef = useFocusVisible<HTMLDivElement>() as React.MutableRefObject<HTMLElement | null>;
  const classes = usePortalMountNodeStylesStyles();
  const themeClassName = useThemeClassName();

  const factoryOptions: UseElementFactoryOptions = {
    dir,
    disabled: options.disabled,
    focusVisibleRef,

    className: mergeClasses(themeClassName, classes.root, options.className),
    targetNode: mountNode ?? targetDocument?.body,
  };

  return useElementFactory(factoryOptions);
};
