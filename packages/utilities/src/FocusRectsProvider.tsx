import * as React from 'react';

export type IFocusRectsContext = {
  /**
   * Ref to the root element of the provider
   */
  providerRef?: React.RefObject<HTMLElement>;

  /**
   * Array of all provider roots in this React tree.
   * All child FocusRectsProviders share the same `allProviders` array as the parent. This way, a focus event in any of
   * them will set focus visible styling on all of them.
   */
  allProviders?: HTMLElement[];
};

export const FocusRectsContext = React.createContext<IFocusRectsContext>({});

export type FocusRectsProviderParams = {
  /**
   * Ref to the root element that this is providing focus rects for.
   */
  providerRef: React.RefObject<HTMLElement>;
};

export const FocusRectsProvider: React.FC<FocusRectsProviderParams> = params => {
  const { providerRef } = params;

  // Get the registered providers array from the parent if it exists. Otherwise, this is the root and we need to create
  // a allProviders array that'll be used by this and all child providers.
  const parentContext = React.useContext(FocusRectsContext);
  const [allProvidersRoot] = React.useState<HTMLElement[]>([]);
  const allProviders = parentContext.allProviders ?? allProvidersRoot;

  React.useEffect(() => {
    const providerElem = providerRef.current;
    if (providerElem) {
      allProviders.push(providerElem);

      return () => {
        const i = allProviders.indexOf(providerElem);
        if (i >= 0) {
          allProviders.splice(i, 1);
        }
      };
    }
  }, [providerRef, allProviders]);

  return (
    <FocusRectsContext.Provider
      value={React.useMemo(() => ({ providerRef, allProviders }), [providerRef, allProviders])}
    >
      {params.children}
    </FocusRectsContext.Provider>
  );
};
