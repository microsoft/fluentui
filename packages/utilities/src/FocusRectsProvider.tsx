import * as React from 'react';
import { FocusRectsContext } from './useFocusRects';

export type FocusRectsProviderProps = {
  /**
   * Ref to the root element that this is providing focus rects for.
   */
  providerRef: React.RefObject<HTMLElement>;

  /**
   * Indicates that this is the root of a layer, and should not inherit the providerRef from a parent context.
   */
  layerRoot?: boolean;
};

export const FocusRectsProvider: React.FC<FocusRectsProviderProps> = props => {
  const { providerRef, layerRoot } = props;
  const [registeredProviders] = React.useState<React.RefObject<HTMLElement>[]>([]);
  const parentContext = React.useContext(FocusRectsContext);

  // Inherit the parent context if it exists, unless this is a layer root.
  // This allows the topmost provider element in the DOM tree to handle the focus events.
  // Since layers are in a separate HTML tree from their parent, they shouldn't use the parent's providerRef.
  const inheritParentContext = parentContext !== undefined && !layerRoot;

  const context = React.useMemo(
    () =>
      inheritParentContext
        ? undefined
        : {
            providerRef,
            registeredProviders,
            registerProvider: (ref: React.RefObject<HTMLElement>) => {
              // Register this child provider with the current context, and any parent contexts
              registeredProviders.push(ref);
              parentContext?.registerProvider(ref);
            },
            unregisterProvider: (ref: React.RefObject<HTMLElement>) => {
              parentContext?.unregisterProvider(ref);
              const i = registeredProviders.indexOf(ref);
              if (i >= 0) {
                registeredProviders.splice(i, 1);
              }
            },
          },
    [providerRef, registeredProviders, parentContext, inheritParentContext],
  );

  React.useEffect(() => {
    if (context) {
      context.registerProvider(context.providerRef);
      return () => context.unregisterProvider(context.providerRef);
    }
  }, [context]);

  // Create a new context provider if this is not inheriting from the parent.
  if (context) {
    return <FocusRectsContext.Provider value={context}>{props.children}</FocusRectsContext.Provider>;
  } else {
    return <>{props.children}</>;
  }
};
