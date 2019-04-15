import * as React from 'react';

export const IntersectionContext = React.createContext<IntersectionObserver | null>(null);

export interface IIntersectionProps extends React.Props<{}> {
  intersectionObserverInit?: IntersectionObserverInit;
  onIntersection: IntersectionObserverCallback;
}

export const Intersection = (props: IIntersectionProps) => {
  const rootElement = React.useRef<HTMLDivElement>(null);
  const [intersectionObserver, setIntersectionObserver] = React.useState<IntersectionObserver | null>(null);
  const { intersectionObserverInit, children, onIntersection = () => {} } = props;

  React.useEffect(() => {
    const options: IntersectionObserverInit = {
      ...{
        root: rootElement.current,
        rootMargin: '0px',
        threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      },
      ...intersectionObserverInit
    };

    const intersectionObserver = new IntersectionObserver(onIntersection, options);

    setIntersectionObserver(intersectionObserver);

    return function cleanup() {
      intersectionObserver.disconnect();
    };
  }, []);

  return <IntersectionContext.Provider value={intersectionObserver}>{children}</IntersectionContext.Provider>;
};
