import * as React from 'react';

export function useStableProps<P>(props: P) {
  const stableProps = React.useRef<P>(props);

  React.useEffect(() => {
    stableProps.current = props;
  });

  return stableProps;
}
