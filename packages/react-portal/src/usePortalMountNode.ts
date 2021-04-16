import * as React from 'react';
import { useIsomorphicLayoutEffect, isSSR } from '@fluentui/react-utilities';
import { useThemeClassName, useFluent } from '@fluentui/react-shared-contexts';

export type UsePortalElementOptions = {
  /**
   * The document where the portal element will be created
   *
   * @defaultValue document from Fluent context
   */
  targetDocument?: Document | undefined;
  /**
   * HTML dir attribute
   *
   * @defaultVaue dir from Fluent context
   */
  dir?: React.HTMLAttributes<HTMLElement>['dir'];
  /**
   * CSS class to apply
   */
  className?: string;

  /**
   * Since hooks cannot be called conditionally use this flag to disable creating the node
   */
  disable?: boolean;
};

/**
 * Creates a new element on a document.body to mount portals
 */
export const usePortalMountNode = (options: UsePortalElementOptions) => {
  const themeClassName = useThemeClassName();
  const { document: fluentDocument, dir: fluentDir } = useFluent();

  const dir = options.dir ?? fluentDir;
  const targetDocument = options.targetDocument ?? fluentDocument;

  const element = React.useMemo(() => {
    if (isSSR() || targetDocument === undefined || options.disable) {
      return undefined;
    }

    const newElement = targetDocument.createElement('div');
    const className = [options.className, themeClassName].filter(Boolean).join(' ');
    newElement.setAttribute('class', className);
    newElement.setAttribute('dir', dir);
    targetDocument?.body.appendChild(newElement);

    return newElement;
  }, [targetDocument, options.className, themeClassName, dir, options.disable]);

  useIsomorphicLayoutEffect(() => {
    return () => {
      if (element) {
        element?.parentElement?.removeChild(element);
      }
    };
  }, [element]);

  return element;
};
