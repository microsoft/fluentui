import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from '@fluentui/react';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 100,
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

export const HorizontalStackVerticalAlignExample: React.FunctionComponent = () => {
  return (
    <Stack enableScopedSelectors tokens={stackTokens}>
      <span>Top-aligned</span>
      <Stack enableScopedSelectors horizontal verticalAlign="start" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Vertically centered</span>
      <Stack enableScopedSelectors horizontal verticalAlign="center" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Bottom-aligned</span>
      <Stack enableScopedSelectors horizontal verticalAlign="end" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>
    </Stack>
  );
};
