import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Non-mutating styles definition
const itemStyles: React.CSSProperties = {
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  width: 50
};

// Tokens definition
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const wrapStackTokens: IStackTokens = { childrenGap: 20 };

export const VerticalStackWrapExample: React.FunctionComponent = () => {
  const [stackHeight, setStackHeight] = React.useState<number>(420);

  // Mutating styles definition
  const stackStyles: IStackStyles = {
    root: {
      background: DefaultPalette.themeTertiary,
      height: stackHeight
    }
  };

  return (
    <Stack tokens={sectionStackTokens}>
      <Slider
        label="Change the stack height to see how child items wrap onto multiple columns:"
        min={1}
        max={420}
        step={1}
        defaultValue={420}
        showValue={true}
        onChange={setStackHeight}
      />

      <Stack wrap styles={stackStyles} tokens={wrapStackTokens}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
        <span style={itemStyles}>4</span>
        <span style={itemStyles}>5</span>
        <span style={itemStyles}>6</span>
      </Stack>
    </Stack>
  );
};
