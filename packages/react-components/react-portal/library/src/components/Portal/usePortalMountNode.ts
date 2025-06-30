import * as React from 'react';
import {
  useThemeClassName_unstable as useThemeClassName,
  useFluent_unstable as useFluent,
  usePortalMountNode as usePortalMountNodeContext,
} from '@fluentui/react-shared-contexts';
import { mergeClasses } from '@griffel/react';
import { useFocusVisible } from '@fluentui/react-tabster';
import { useDisposable } from 'use-disposable';

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

  const element = useDisposable(() => {
    if (targetNode === undefined || options.disabled) {
      return [null, () => null];
    }

    const newElement = targetNode.ownerDocument.createElement('div');
    targetNode.appendChild(newElement);
    return [newElement, () => newElement.remove()];
  }, [targetNode]);

  if (useInsertionEffect) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useInsertionEffect(() => {
      if (!element) {
        return;
      }

      const classesToApply = className.split(' ').filter(Boolean);

      element.classList.add(...classesToApply);
      element.setAttribute('dir', dir);
      element.setAttribute('data-portal-node', 'true');

      focusVisibleRef.current = element;

      return () => {
        element.classList.remove(...classesToApply);
        element.removeAttribute('dir');
      };
    }, [className, dir, element, focusVisibleRef]);
  } else {
    // This useMemo call is intentional for React 17
    // We don't want to re-create the portal element when its attributes change.
    // This also should not be done in an effect because, changing the value of css variables
    // after initial mount can trigger interesting CSS side effects like transitions.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useMemo(() => {
      if (!element) {
        return;
      }

      // Force replace all classes
      element.className = className;
      element.setAttribute('dir', dir);
      element.setAttribute('data-portal-node', 'true');

      focusVisibleRef.current = element;
    }, [className, dir, element, focusVisibleRef]);
  }

  return element;
};
