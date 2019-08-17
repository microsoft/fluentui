import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary
  }
};
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center'
  }
};

// Tokens definition
const stackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10
};

export const HorizontalStackGrowExample: React.FunctionComponent = () => {
  return (
    <Stack horizontal styles={stackStyles} tokens={stackTokens}>
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
  );
};
