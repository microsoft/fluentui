import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens } from 'office-ui-fabric-react';

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
    <Stack tokens={sectionStackTokens}>
      <Stack horizontal disableShrink horizontalAlign="space-between">
        <Stack>
          <span>Numerical spacing</span>
          <Stack horizontal styles={stackStyles} tokens={numericalSpacingStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack>
          <span>Custom spacing</span>
          <Stack horizontal styles={stackStyles} tokens={customSpacingStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack horizontal disableShrink horizontalAlign="space-between">
        <Stack>
          <span>Themed spacing (extra small)</span>
          <Stack horizontal styles={stackStyles} tokens={themedExtraSmallStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack>
          <span>Themed spacing (small)</span>
          <Stack horizontal styles={stackStyles} tokens={themedSmallStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack>
          <span>Themed spacing (medium)</span>
          <Stack horizontal styles={stackStyles} tokens={themedMediumStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>

      <Stack horizontal horizontalAlign="space-between">
        <Stack>
          <span>Themed spacing (large)</span>
          <Stack horizontal styles={stackStyles} tokens={themedLargeStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
        <Stack>
          <span>Themed spacing (extra large)</span>
          <Stack horizontal styles={stackStyles} tokens={themedExtraLargeStackTokens}>
            <span style={itemStyles}>1</span>
            <span style={itemStyles}>2</span>
            <span style={itemStyles}>3</span>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
