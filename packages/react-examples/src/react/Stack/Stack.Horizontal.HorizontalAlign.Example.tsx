import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from '@fluentui/react';

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
    <Stack enableScopedSelectors tokens={stackTokens}>
      <span>Left-aligned</span>
      <Stack enableScopedSelectors horizontal horizontalAlign="start" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Horizontally centered</span>
      <Stack enableScopedSelectors horizontal horizontalAlign="center" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Right-aligned</span>
      <Stack enableScopedSelectors horizontal horizontalAlign="end" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Horizontal space around items</span>
      <Stack enableScopedSelectors horizontal horizontalAlign="space-around" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Horizontal space between items</span>
      <Stack enableScopedSelectors horizontal horizontalAlign="space-between" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>

      <span>Items horizontally evenly spaced</span>
      <Stack enableScopedSelectors horizontal horizontalAlign="space-evenly" styles={stackStyles}>
        <span style={itemStyles}>1</span>
        <span style={itemStyles}>2</span>
        <span style={itemStyles}>3</span>
      </Stack>
    </Stack>
  );
};
