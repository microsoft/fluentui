import * as React from 'react';
import { IconButton, Icons } from '@storybook/components';

import { STRICT_MODE_ID } from '../constants';
import { useGlobals } from '../hooks';

export const ReactStrictMode = () => {
  const [globals, updateGlobals] = useGlobals();

  const isActive = globals[STRICT_MODE_ID] ?? false;

  const toggleStrictMode = React.useCallback(
    () =>
      updateGlobals({
        [STRICT_MODE_ID]: !isActive,
      }),
    [isActive, updateGlobals],
  );

  return (
    <IconButton key={STRICT_MODE_ID} active={isActive} title="Toggle React Strict mode" onClick={toggleStrictMode}>
      <Icons icon="lock" />
    </IconButton>
  );
};
