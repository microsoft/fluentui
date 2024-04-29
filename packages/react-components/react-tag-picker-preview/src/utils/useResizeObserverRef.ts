import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

export const useResizeObserverRef = <E extends HTMLElement>(callback: ResizeObserverCallback): React.Ref<E> => {
  const { targetDocument } = useFluent();
  const [observer] = React.useState(() => {
    const ResizeObserverConstructor = targetDocument?.defaultView?.ResizeObserver;
    if (ResizeObserverConstructor) {
      return new ResizeObserverConstructor(callback);
    }
  });
  const ref: React.RefCallback<E> = React.useCallback(
    element => {
      if (element) {
        observer?.observe(element);
      } else {
        observer?.disconnect();
      }
    },
    [observer],
  );
  return ref;
};
