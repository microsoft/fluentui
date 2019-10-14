import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 250
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
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const headingStackTokens: IStackTokens = { childrenGap: 30 };

export const VerticalStackVerticalAlignExample: React.FunctionComponent = () => {
  return (
    <Stack tokens={sectionStackTokens}>
      <Stack horizontal disableShrink horizontalAlign="space-between" tokens={headingStackTokens}>
        <Stack grow>
          <span>Top-aligned</span>
          <Stack verticalAlign="start" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack grow>
          <span>Vertically centered</span>
          <Stack verticalAlign="center" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack grow>
          <span>Bottom-aligned</span>
          <Stack verticalAlign="end" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack horizontal disableShrink horizontalAlign="space-between" tokens={headingStackTokens}>
        <Stack grow>
          <span>Vertical space around items</span>
          <Stack verticalAlign="space-around" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack grow>
          <span>Vertical space between items</span>
          <Stack verticalAlign="space-between" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack grow>
          <span>Items vertically evenly spaced</span>
          <Stack verticalAlign="space-evenly" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
