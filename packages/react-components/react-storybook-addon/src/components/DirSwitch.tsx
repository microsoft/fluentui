import * as React from 'react';
import { IconButton } from '@storybook/components';

import { DIR_ID } from '../constants';
import { useGlobals } from '../hooks';

import { useDirSwitchStyles } from './DirSwitch.styles';

export const DirSwitch = () => {
  const [globals, updateGlobals] = useGlobals();
  const styles = useDirSwitchStyles();

  const direction = globals[DIR_ID] ?? 'ltr';
  const isLTR = direction === 'ltr';

  const toggleDirection = React.useCallback(
    () =>
      updateGlobals({
        [DIR_ID]: isLTR ? 'rtl' : 'ltr',
      }),
    [isLTR, updateGlobals],
  );

  return (
    <IconButton key={DIR_ID} title="Change Direction" onClick={toggleDirection}>
      <div>
        Direction: <span className={styles.monospace}>{isLTR ? 'LTR' : 'RTL'}</span>
      </div>
    </IconButton>
  );
};
