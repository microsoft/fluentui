import * as React from 'react';
import { IntersectionContext } from './Intersection';
import { IObserverProps } from './ObserverList.types';

export const Observer = (props: IObserverProps) => {
  const { children } = props;
  const rootElement = React.useRef<HTMLDivElement>(null);
  const intersectionObserver = React.useContext(IntersectionContext);

  if (rootElement.current && intersectionObserver) {
    intersectionObserver.observe(rootElement.current);
  }

  return <>{children(rootElement)}</>;
};
