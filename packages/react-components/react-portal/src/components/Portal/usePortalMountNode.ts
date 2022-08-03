import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import {
  useThemeClassName_unstable as useThemeClassName,
  useFluent_unstable as useFluent,
} from '@fluentui/react-shared-contexts';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useFocusVisible } from '@fluentui/react-tabster';

export type UsePortalMountNodeOptions = {
  /**
   * Since hooks cannot be called conditionally use this flag to disable creating the node
   */
  disabled?: boolean;
};

const useStyles = makeStyles({
  root: {
    position: 'relative',
    zIndex: 1000000,
  },
});

/**
 * Creates a new element on a document.body to mount portals
 */
export const usePortalMountNode = (options: UsePortalMountNodeOptions): HTMLElement | null => {
  const { targetDocument, dir } = useFluent();
  const focusVisibleRef = useFocusVisible<HTMLDivElement>() as React.MutableRefObject<HTMLElement | null>;

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
      focusVisibleRef.current = element;

      return () => {
        element.classList.remove(...classesToApply);
        element.removeAttribute('dir');
      };
    }
  }, [className, dir, element, focusVisibleRef]);

  React.useEffect(() => {
    return () => {
      element?.parentElement?.removeChild(element);
    };
  }, [element]);

  return element;
};
