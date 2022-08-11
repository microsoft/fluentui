import * as React from 'react';
import { FocusRectsContext } from './useFocusRects';

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

  const context = React.useMemo(() => ({ providerRef, allProviders }), [providerRef, allProviders]);

  return <FocusRectsContext.Provider value={context}>{params.children}</FocusRectsContext.Provider>;
};
