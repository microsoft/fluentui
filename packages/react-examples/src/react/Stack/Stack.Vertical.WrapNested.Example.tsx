import * as React from 'react';
import { Slider } from '@fluentui/react/lib/Slider';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

// Non-mutating styles definition
const textStyles: React.CSSProperties = {
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: DefaultPalette.white,
};
const firstStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralTertiary,
  },
};
const firstStackItemStyles: React.CSSProperties = {
  ...textStyles,
  background: DefaultPalette.themePrimary,
};
const secondStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralSecondary,
  },
};
const secondStackItemStyles: React.CSSProperties = {
  ...textStyles,
  background: DefaultPalette.themeDark,
};
const thirdStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralPrimary,
  },
};
const thirdStackItemStyles: React.CSSProperties = {
  ...textStyles,
  background: DefaultPalette.themeDarker,
};

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const wrapStackTokens: IStackTokens = { childrenGap: '30 40' };
const firstStackTokens: IStackTokens = { childrenGap: '10 30' };
const secondStackTokens: IStackTokens = { childrenGap: '20 50' };

export const VerticalStackWrapNestedExample: React.FunctionComponent = () => {
  const [stackHeight, setStackHeight] = React.useState<number>(420);

  // Mutating styles definition
  const containerStackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      height: stackHeight,
    },
  };

  return (
    <Stack enableScopedSelectors tokens={sectionStackTokens}>
      <Slider
        label="Change the stack height to see how child items wrap onto multiple columns:"
        min={1}
        max={420}
        step={1}
        defaultValue={420}
        showValue={true}
        onChange={setStackHeight}
      />

      <Stack enableScopedSelectors wrap styles={containerStackStyles} tokens={wrapStackTokens}>
        <Stack enableScopedSelectors wrap styles={firstStackStyles} tokens={firstStackTokens}>
          <span style={firstStackItemStyles}>1</span>
          <span style={firstStackItemStyles}>2</span>
          <span style={firstStackItemStyles}>3</span>
          <span style={firstStackItemStyles}>4</span>
          <span style={firstStackItemStyles}>5</span>
          <span style={firstStackItemStyles}>6</span>
          <span style={firstStackItemStyles}>7</span>
        </Stack>

        <Stack enableScopedSelectors wrap styles={secondStackStyles} tokens={secondStackTokens}>
          <span style={secondStackItemStyles}>1</span>
          <span style={secondStackItemStyles}>2</span>
          <span style={secondStackItemStyles}>3</span>
        </Stack>

        <Stack enableScopedSelectors wrap styles={thirdStackStyles}>
          <span style={thirdStackItemStyles}>1</span>
          <span style={thirdStackItemStyles}>2</span>
          <span style={thirdStackItemStyles}>3</span>
          <span style={thirdStackItemStyles}>4</span>
          <span style={thirdStackItemStyles}>5</span>
          <span style={thirdStackItemStyles}>6</span>
          <span style={thirdStackItemStyles}>7</span>
          <span style={thirdStackItemStyles}>8</span>
          <span style={thirdStackItemStyles}>9</span>
          <span style={thirdStackItemStyles}>10</span>
        </Stack>
      </Stack>

      <span>
        <b>Note:</b>
      </span>
      <span>
        Support for nested wrapping of vertical flex-boxes is scarce across browsers, especially in the way they handle
        overflows.
      </span>
      <span>Most browsers don't scale the width of the flex-box when the inner items overflow and wrap around it.</span>
      <span>
        The one exception to this case being Microsoft Edge that handles it correctly (though this might go soon with
        the switch to Chromium).
      </span>
      <span>There are ways in which we could have gone around this issue.</span>
      <span>
        However, we have chosen to adhere to the flex-box spec so that we have the correct implementation if support
        comes down the line.
      </span>
    </Stack>
  );
};
