import * as React from 'react';
import { DefaultPalette, Slider, Stack, IStackStyles, IStackTokens, IStackItemStyles } from 'office-ui-fabric-react';

// Non-mutating styles definition
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
};
const nonShrinkingStackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 500,
  },
};

// Tokens definition
const outerStackTokens: IStackTokens = { childrenGap: 5 };
const innerStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};

export const HorizontalStackShrinkExample: React.FunctionComponent = () => {
  const [stackWidth, setStackWidth] = React.useState<number>(100);

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      overflow: 'hidden',
      width: `${stackWidth}%`,
    },
  };

  return (
    <Stack tokens={outerStackTokens}>
      <Slider
        label="Change the stack width to see how child items shrink:"
        min={1}
        max={100}
        step={1}
        defaultValue={100}
        showValue={true}
        onChange={setStackWidth}
      />
      <Stack horizontal styles={stackStyles} tokens={innerStackTokens}>
        <Stack.Item grow styles={stackItemStyles}>
          I shrink
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles}>
          I shrink
        </Stack.Item>
        <Stack.Item grow disableShrink styles={nonShrinkingStackItemStyles}>
          I don't shrink
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles}>
          I shrink
        </Stack.Item>
      </Stack>
    </Stack>
  );
};
