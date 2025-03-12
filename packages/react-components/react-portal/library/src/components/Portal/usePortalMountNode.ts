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

  const className = mergeClasses(themeClassName, classes.root, options.className);
  const targetNode: HTMLElement | ShadowRoot | undefined = mountNode ?? targetDocument?.body;

  const [elementFactory] = React.useState(() => {
    let currentElement: HTMLDivElement | undefined = undefined;

    function get(targetRoot: HTMLElement | ShadowRoot, forceCreation: false): HTMLDivElement | undefined;
    function get(targetRoot: HTMLElement | ShadowRoot, forceCreation: true): HTMLDivElement;
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
  });

  const elementProxy = React.useMemo(() => {
    if (targetNode === undefined || options.disabled) {
      return null;
    }

    return new Proxy({} as HTMLDivElement, {
      get(_, property: keyof HTMLDivElement) {
        // Heads up!
        // We intercept the `remove()` method to remove the mount node only when portal has been unmounted already.
        if (property === 'remove') {
          const targetElement = elementFactory.get(targetNode, false);

          if (targetElement) {
            // If the mountElement has children, the portal is still mounted
            const portalHasNoChildren = targetElement.childNodes.length === 0;

            if (portalHasNoChildren) {
              return targetElement.remove.bind(targetElement);
            }
          }

          return () => {
            // If the mountElement has children, ignore the remove call
          };
        }

        const targetElement = elementFactory.get(targetNode, true);
        const targetProperty = targetElement[property];

        if (typeof targetProperty === 'function') {
          return targetProperty.bind(targetElement);
        }

        return targetProperty;
      },

      set(_, property: keyof HTMLDivElement, value) {
        const targetElement = elementFactory.get(targetNode, true);

        if (targetElement) {
          Object.assign(targetElement, { [property]: value });
          return true;
        }

        return false;
      },
    });
  }, [elementFactory, targetNode, options.disabled]);

  if (useInsertionEffect) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInsertionEffect(() => {
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
  } else {
    // This useMemo call is intentional for React 17
    // We don't want to re-create the portal element when its attributes change.
    // This also should not be done in an effect because, changing the value of css variables
    // after initial mount can trigger interesting CSS side effects like transitions.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useMemo(() => {
      if (!elementProxy) {
        return;
      }

      // Force replace all classes
      elementProxy.className = className;
      elementProxy.setAttribute('dir', dir);
      elementProxy.setAttribute('data-portal-node', 'true');

      focusVisibleRef.current = elementProxy;
    }, [className, dir, elementProxy, focusVisibleRef]);
  }

  return elementProxy;
};
