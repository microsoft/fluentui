import * as React from 'react';

export type ElementContextObject = {
  depth: number;
};

const ElementContext = React.createContext<ElementContextObject>({
  depth: 26,
});

export const useElementContext = () => React.useContext(ElementContext);

const ElementProvider = ElementContext.Provider;
export { ElementProvider };
