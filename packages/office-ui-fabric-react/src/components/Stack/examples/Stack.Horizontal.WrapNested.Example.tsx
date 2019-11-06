import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Non-mutating styles definition
const textStyles: React.CSSProperties = {
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: DefaultPalette.white
};
const firstStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralTertiary
  }
};
const firstStackItemStyles: React.CSSProperties = {
  ...textStyles,
  background: DefaultPalette.themePrimary
};
const secondStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralSecondary
  }
};
const secondStackItemStyles: React.CSSProperties = {
  ...textStyles,
  background: DefaultPalette.themeDark
};
const thirdStackStyles: IStackStyles = {
  root: {}
};
const thirdStackItemStyles: React.CSSProperties = {
  ...textStyles,
  background: DefaultPalette.themeDarker
};

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const wrapStackTokens: IStackTokens = { childrenGap: '30 40' };
const firstStackTokens: IStackTokens = { childrenGap: '10 30' };
const secondStackTokens: IStackTokens = { childrenGap: '20 50' };

export const HorizontalStackWrapNestedExample: React.FunctionComponent = () => {
  const [stackWidth, setStackWidth] = React.useState<number>(100);

  // Mutating styles definition
  const containerStackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      width: `${stackWidth}%`
    }
  };

  return (
    <Stack tokens={sectionStackTokens}>
      <Slider
        label="Change the stack width to see how child items wrap onto multiple rows:"
        min={1}
        max={100}
        step={1}
        defaultValue={100}
        showValue={true}
        onChange={setStackWidth}
      />

      <Stack horizontal wrap styles={containerStackStyles} tokens={wrapStackTokens}>
        <Stack horizontal wrap styles={firstStackStyles} tokens={firstStackTokens}>
          <span style={firstStackItemStyles}>1</span>
          <span style={firstStackItemStyles}>2</span>
          <span style={firstStackItemStyles}>3</span>
          <span style={firstStackItemStyles}>4</span>
          <span style={firstStackItemStyles}>5</span>
          <span style={firstStackItemStyles}>6</span>
          <span style={firstStackItemStyles}>7</span>
        </Stack>

        <Stack horizontal wrap styles={secondStackStyles} tokens={secondStackTokens}>
          <span style={secondStackItemStyles}>1</span>
          <span style={secondStackItemStyles}>2</span>
          <span style={secondStackItemStyles}>3</span>
        </Stack>

        <Stack horizontal wrap styles={thirdStackStyles}>
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
    </Stack>
  );
};
