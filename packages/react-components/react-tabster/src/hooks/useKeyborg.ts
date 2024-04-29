import * as React from 'react';
import { createKeyborg, disposeKeyborg } from 'keyborg';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * @internal
 * Instantiates [keyborg](https://github.com/microsoft/keyborg)
 * @returns - keyborg instance
 */
export function useKeyborg() {
  const { targetDocument } = useFluent();
  const keyborg = React.useMemo(() => targetDocument && createKeyborg(targetDocument.defaultView!), [targetDocument]);

  React.useEffect(() => {
    return () => keyborg && disposeKeyborg(keyborg);
  }, [keyborg]);

  return keyborg;
}
