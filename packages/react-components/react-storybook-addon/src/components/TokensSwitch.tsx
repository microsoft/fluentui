import * as React from 'react';
import { IconButton } from '@storybook/components';
import { styled } from '@storybook/theming';

import { TOKEN_ID } from '../constants';
import { useGlobals } from '../hooks';

const Monospace = styled.span({
  fontFamily: "'Cascadia Code', Menlo, 'Courier New', Courier, monospace",
  letterSpacing: '-0.05em',
});

export const TokensSwitch = () => {
  const [globals, updateGlobals] = useGlobals();

  const token = globals[TOKEN_ID] ?? 'semantic';
  const isSemantic = token === 'semantic';

  const toggleTokens = React.useCallback(
    () =>
      updateGlobals({
        [TOKEN_ID]: isSemantic ? 'legacy' : 'semantic',
      }),
    [isSemantic, updateGlobals],
  );

  return (
    <IconButton key={TOKEN_ID} title="Change Tokens" onClick={toggleTokens}>
      <div>
        Tokens: <Monospace>{token.toUpperCase()}</Monospace>
      </div>
    </IconButton>
  );
};
