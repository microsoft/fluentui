import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary
  }
};
const itemStyles: React.CSSProperties = {
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  width: 50
};

// Tokens definition
const stackTokens: IStackTokens = { childrenGap: 5 };

export const VerticalStackHorizontalAlignExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <span>Left-aligned</span>
      <Stack horizontalAlign="start" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
      </Stack>

      <span>Horizontally centered</span>
      <Stack horizontalAlign="center" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
      </Stack>

      <span>Right-aligned</span>
      <Stack horizontalAlign="end" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
      </Stack>
    </Stack>
  );
};
