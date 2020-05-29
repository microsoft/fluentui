import * as React from 'react';

const useClassNamesListener = (targetRef: React.RefObject<HTMLElement>, onChange: () => void): void => {
  const latestCallback = React.useRef<() => void>();
  latestCallback.current = onChange;

  const observer = React.useMemo(
    () =>
      new MutationObserver(() => {
        latestCallback.current();
      }),
    [],
  );

  React.useEffect(() => {
    // Call also on initial render
    latestCallback.current();
    observer.observe(targetRef.current, {
      attributes: true,
      attributeFilter: ['class'],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [observer, targetRef]);
};

export default useClassNamesListener;
