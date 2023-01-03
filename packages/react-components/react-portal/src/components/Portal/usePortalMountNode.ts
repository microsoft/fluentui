import * as React from 'react';
import {
  useThemeClassName_unstable as useThemeClassName,
  useFluent_unstable as useFluent,
} from '@fluentui/react-shared-contexts';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useFocusVisible } from '@fluentui/react-tabster';
import { useDisposable } from 'use-disposable';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

// String concatenation is used to prevent bundlers to complain with older versions of React
const useInsertionEffect = (React as never)['useInsertion' + 'Effect']
  ? (React as never)['useInsertion' + 'Effect']
  : useIsomorphicLayoutEffect;

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

  const element = useDisposable(() => {
    if (targetDocument === undefined || options.disabled) {
      return [null, () => null];
    }

    const newElement = targetDocument.createElement('div');
    targetDocument.body.appendChild(newElement);
    return [newElement, () => newElement.remove()];
  }, [targetDocument]);

  // This useEffect call is intentional
  // We don't want to re-create the portal element when its attributes change.
  // This also should not be done in an effect because, changing the value of css variables
  // after initial mount can trigger interesting CSS side effects like transitions.
  useInsertionEffect(() => {
    if (!element) {
      return;
    }

    const classesToApply = className.split(' ').filter(Boolean);

    element.classList.add(...classesToApply);
    element.setAttribute('dir', dir);
    focusVisibleRef.current = element;

    return () => {
      element.classList.remove(...classesToApply);
      element.removeAttribute('dir');
    };
  }, [className, dir, element, focusVisibleRef]);

  return element;
};
