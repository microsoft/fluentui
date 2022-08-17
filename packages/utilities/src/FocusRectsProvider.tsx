import * as React from 'react';
import { FocusRectsContext } from './useFocusRects';

export type FocusRectsProviderParams = {
  /**
   * Ref to the root element that this is providing focus rects for.
   */
  providerRef: React.RefObject<HTMLElement>;

  /**
   * Indicates that this is the root of a layer, and should not inherit the providerRef from a parent context.
   */
  layerRoot?: boolean;
};

export const FocusRectsProvider: React.FC<FocusRectsProviderParams> = params => {
  const { providerRef, layerRoot } = params;
  const [registeredProviders] = React.useState<HTMLElement[]>([]);
  const parentContext = React.useContext(FocusRectsContext);

  // Inherit the parent context if it exists, unless this is a layer root.
  // This allows the topmost provider element in the HTML tree to handle the focus events.
  // Since layers are in a separate HTML tree from their parent, they shouldn't use the parent's providerRef.
  const inheritParentContext = parentContext.providerRef !== undefined && !layerRoot;

  const context = React.useMemo(
    () =>
      inheritParentContext
        ? undefined
        : {
            providerRef,
            registeredProviders,
            registerProvider: (e: HTMLElement) => {
              // Register this child provider with the current context, and any parent contexts
              registeredProviders.push(e);
              parentContext.registerProvider?.(e);
            },
            unregisterProvider: (e: HTMLElement) => {
              parentContext.unregisterProvider?.(e);
              const i = registeredProviders.indexOf(e);
              if (i >= 0) {
                registeredProviders.splice(i, 1);
              }
            },
          },
    [providerRef, registeredProviders, parentContext, inheritParentContext],
  );

  React.useEffect(() => {
    if (context) {
      const providerElem = context.providerRef.current;
      if (providerElem) {
        context.registerProvider(providerElem);
        return () => context.unregisterProvider(providerElem);
      }
    }
  }, [context]);

  // Create a new context provider if this is not inheriting from the parent.
  if (context) {
    return <FocusRectsContext.Provider value={context}>{params.children}</FocusRectsContext.Provider>;
  } else {
    return <>{params.children}</>;
  }
};
