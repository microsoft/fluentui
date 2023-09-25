import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from '@fluentui/react';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    width: 300,
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
const numericalSpacingStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const customSpacingStackTokens: IStackTokens = {
  childrenGap: '10%',
  padding: 's1 15%',
};
const themedExtraSmallStackTokens: IStackTokens = {
  childrenGap: 's2',
  padding: 's2',
};
const themedSmallStackTokens: IStackTokens = {
  childrenGap: 's1',
  padding: 's1',
};
const themedMediumStackTokens: IStackTokens = {
  childrenGap: 'm',
  padding: 'm',
};
const themedLargeStackTokens: IStackTokens = {
  childrenGap: 'l1',
  padding: 'l1',
};
const themedExtraLargeStackTokens: IStackTokens = {
  childrenGap: 'l2',
  padding: 'l2',
};

export const HorizontalStackSpacingExample: React.FunctionComponent = () => {
  return (
    <Stack enableScopedSelectors tokens={sectionStackTokens}>
      <Stack enableScopedSelectors horizontal disableShrink horizontalAlign="space-between">
        <Stack enableScopedSelectors>
          <span>Numerical spacing</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={numericalSpacingStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack enableScopedSelectors>
          <span>Custom spacing</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={customSpacingStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack enableScopedSelectors horizontal disableShrink horizontalAlign="space-between">
        <Stack enableScopedSelectors>
          <span>Themed spacing (extra small)</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={themedExtraSmallStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack enableScopedSelectors>
          <span>Themed spacing (small)</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={themedSmallStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack enableScopedSelectors>
          <span>Themed spacing (medium)</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={themedMediumStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack enableScopedSelectors horizontal horizontalAlign="space-between">
        <Stack enableScopedSelectors>
          <span>Themed spacing (large)</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={themedLargeStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack enableScopedSelectors>
          <span>Themed spacing (extra large)</span>
          <Stack enableScopedSelectors horizontal styles={stackStyles} tokens={themedExtraLargeStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
