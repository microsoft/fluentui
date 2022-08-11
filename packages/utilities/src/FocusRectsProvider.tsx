import * as React from 'react';

export type IFocusRectsContext = {
  /**
   * Ref to the root element of the provider
   */
  providerRef?: React.RefObject<HTMLElement>;
  registeredProviders?: HTMLElement[];
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
  // a registeredProviders array that'll be used by this and all child providers.
  const { registeredProviders: parentRegisteredProviders } = React.useContext(FocusRectsContext);
  const [rootRegisteredProviders] = React.useState<HTMLElement[]>([]);
  const registeredProviders = parentRegisteredProviders ?? rootRegisteredProviders;

  React.useEffect(() => {
    const providerElem = providerRef.current;
    if (providerElem) {
      registeredProviders.push(providerElem);

      return () => {
        const i = registeredProviders.indexOf(providerElem);
        if (i >= 0) {
          registeredProviders.splice(i, 1);
        }
      };
    }
  }, [providerRef, registeredProviders]);

  return (
    <FocusRectsContext.Provider
      value={React.useMemo(() => ({ providerRef, registeredProviders }), [providerRef, registeredProviders])}
    >
      {params.children}
    </FocusRectsContext.Provider>
  );
};
