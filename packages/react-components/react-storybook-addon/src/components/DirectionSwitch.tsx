import * as React from 'react';
import { IconButton } from '@storybook/components';
import { styled } from '@storybook/theming';

import { JSXElement } from '@fluentui/react-utilities';
import { DIR_ID } from '../constants';
import { useGlobals } from '../hooks';

const Monospace = styled.span({
  fontFamily: "'Cascadia Code', Menlo, 'Courier New', Courier, monospace",
  letterSpacing: '-0.05em',
});

export const DirectionSwitch = (): JSXElement => {
  const [globals, updateGlobals] = useGlobals();

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
        Direction: <Monospace>{direction.toUpperCase()}</Monospace>
      </div>
    </IconButton>
  );
};
