import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useThemeClassName, useFluent } from '@fluentui/react-shared-contexts';
import { useKeyboardNavAttribute } from '@fluentui/react-tabster';

export type UsePortalMountNodeOptions = {
  /**
   * Since hooks cannot be called conditionally use this flag to disable creating the node
   */
  disabled?: boolean;
};

/**
 * Creates a new element on a document.body to mount portals
 */
export const usePortalMountNode = (options: UsePortalMountNodeOptions): HTMLElement | null => {
  const themeClassName = useThemeClassName();
  const { targetDocument, dir } = useFluent();

  const element = React.useMemo(() => {
    if (targetDocument === undefined || options.disabled) {
      return null;
    }

    const newElement = targetDocument.createElement('div');
    newElement.setAttribute('class', themeClassName);
    newElement.setAttribute('dir', dir);
    targetDocument.body.appendChild(newElement);

    return newElement;
  }, [targetDocument, themeClassName, dir, options.disabled]);

  (useKeyboardNavAttribute() as React.MutableRefObject<HTMLElement>).current = element!;

  useIsomorphicLayoutEffect(() => {
    return () => {
      element?.parentElement?.removeChild(element);
    };
  }, [element]);

  return element;
};
