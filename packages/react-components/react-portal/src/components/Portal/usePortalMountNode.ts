import * as React from 'react';
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

  const mountNode = React.useMemo(() => {
    if (targetDocument === undefined || options.disabled) {
      return null;
    }

    const element = targetDocument.createElement('div');
    focusVisibleRef.current = element;

    const classesToApply = className.split(' ').filter(Boolean);
    element.classList.add(...classesToApply);

    element.setAttribute('dir', dir);

    targetDocument.body.appendChild(element);

    return element;
  }, [targetDocument, options.disabled, focusVisibleRef, className, dir]);

  React.useEffect(() => {
    return () => {
      mountNode?.remove();
    };
  }, [mountNode]);

  return mountNode;
};
