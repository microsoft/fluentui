import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import {
  useThemeClassName_unstable as useThemeClassName,
  useFluent_unstable as useFluent,
} from '@fluentui/react-shared-contexts';
import { useKeyboardNavAttribute } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses } from '@griffel/react';

export type UsePortalMountNodeOptions = {
  /**
   * Since hooks cannot be called conditionally use this flag to disable creating the node
   */
  disabled?: boolean;
};

const useStyles = makeStyles({
  root: {
    zIndex: 1000000,
  },
});

/**
 * Creates a new element on a document.body to mount portals
 */
export const usePortalMountNode = (options: UsePortalMountNodeOptions): HTMLElement | null => {
  const { targetDocument, dir } = useFluent();

  const classes = useStyles();
  const themeClassName = useThemeClassName();

  const className = mergeClasses(themeClassName, classes.root);

  const element = React.useMemo(() => {
    if (targetDocument === undefined || options.disabled) {
      return null;
    }

    const newElement = targetDocument.createElement('div');
    targetDocument.body.appendChild(newElement);

    return newElement;
  }, [targetDocument, options.disabled]);

  useIsomorphicLayoutEffect(() => {
    if (element) {
      const classesToApply = className.split(' ').filter(Boolean);

      element.classList.add(...classesToApply);
      element.setAttribute('dir', dir);

      return () => {
        element.classList.remove(...classesToApply);
        element.removeAttribute('dir');
      };
    }
  }, [element, className, dir]);

  (useKeyboardNavAttribute() as React.MutableRefObject<HTMLElement>).current = element!;

  React.useEffect(() => {
    return () => {
      element?.parentElement?.removeChild(element);
    };
  }, [element]);

  return element;
};
