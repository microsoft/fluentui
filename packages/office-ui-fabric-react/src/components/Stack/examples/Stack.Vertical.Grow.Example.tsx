import * as React from 'react';
import { Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 250,
  },
};
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    justifyContent: 'center',
  },
};

// Tokens definition
const outerStackTokens: IStackTokens = { childrenGap: 5 };
const innerStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};

export const VerticalStackGrowExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={outerStackTokens}>
      <Stack styles={stackStyles} tokens={innerStackTokens}>
        <Stack.Item grow={3} styles={stackItemStyles}>
          Grow is 3
        </Stack.Item>
        <Stack.Item grow={2} styles={stackItemStyles}>
          Grow is 2
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles}>
          Grow is 1
        </Stack.Item>
      </Stack>
    </Stack>
  );
};
