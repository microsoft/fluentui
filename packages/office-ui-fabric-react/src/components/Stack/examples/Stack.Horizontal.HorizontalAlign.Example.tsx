import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};
const itemStyles: React.CSSProperties = {
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  width: 50,
};

// Tokens definition
const stackTokens: IStackTokens = { childrenGap: 5 };

export const HorizontalStackHorizontalAlignExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={stackTokens}>
      <span>Left-aligned</span>
      <Stack horizontal horizontalAlign="start" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Horizontally centered</span>
      <Stack horizontal horizontalAlign="center" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Right-aligned</span>
      <Stack horizontal horizontalAlign="end" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Horizontal space around items</span>
      <Stack horizontal horizontalAlign="space-around" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Horizontal space between items</span>
      <Stack horizontal horizontalAlign="space-between" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Items horizontally evenly spaced</span>
      <Stack horizontal horizontalAlign="space-evenly" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>
    </Stack>
  );
};
