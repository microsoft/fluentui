import * as React from 'react';
import { IconButton } from '@storybook/components';
import { LockIcon } from '@storybook/icons';

import type { JSXElement } from '@fluentui/react-utilities';
import { STRICT_MODE_ID } from '../constants';
import { useGlobals } from '../hooks';

export const ReactStrictMode = (): JSXElement => {
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
      <LockIcon />
    </IconButton>
  );
};
