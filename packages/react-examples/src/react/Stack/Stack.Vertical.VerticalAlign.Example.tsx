import * as React from 'react';
import { Stack, IStackStyles, IStackTokens } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 250,
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
const sectionStackTokens: IStackTokens = { childrenGap: 10 };
const headingStackTokens: IStackTokens = { childrenGap: 30 };

export const VerticalStackVerticalAlignExample: React.FunctionComponent = () => {
  return (
    <Stack enableScopedSelectors tokens={sectionStackTokens}>
      <Stack enableScopedSelectors horizontal disableShrink horizontalAlign="space-between" tokens={headingStackTokens}>
        <Stack enableScopedSelectors grow>
          <span>Top-aligned</span>
          <Stack enableScopedSelectors verticalAlign="start" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack enableScopedSelectors grow>
          <span>Vertically centered</span>
          <Stack enableScopedSelectors verticalAlign="center" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack enableScopedSelectors grow>
          <span>Bottom-aligned</span>
          <Stack enableScopedSelectors verticalAlign="end" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack enableScopedSelectors horizontal disableShrink horizontalAlign="space-between" tokens={headingStackTokens}>
        <Stack enableScopedSelectors grow>
          <span>Vertical space around items</span>
          <Stack enableScopedSelectors verticalAlign="space-around" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack enableScopedSelectors grow>
          <span>Vertical space between items</span>
          <Stack enableScopedSelectors verticalAlign="space-between" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>

        <Stack enableScopedSelectors grow>
          <span>Items vertically evenly spaced</span>
          <Stack enableScopedSelectors verticalAlign="space-evenly" styles={stackStyles}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
