import * as React from 'react';
import { DefaultPalette, Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react';

// Styles definition
const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
  },
};
const stackItemStyles: IStackItemStyles = {
  root: {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: 5,
  },
};
const itemAlignmentsStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    height: 100,
  },
};

// Tokens definition
const containerStackTokens: IStackTokens = { childrenGap: 5 };
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};
const itemAlignmentsStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 10,
};
const clickableStackTokens: IStackTokens = {
  padding: 10,
};

export const HorizontalStackReversedExample: React.FunctionComponent = () => {
  return (
    <Stack enableScopedSelectors tokens={containerStackTokens}>
      <span>Default horizontal stack</span>
      <Stack enableScopedSelectors horizontal reversed disableShrink styles={stackStyles}>
        <span>Item One</span>
        <span>Item Two</span>
        <span>Item Three</span>
      </Stack>

      <span>Horizontal gap between items</span>
      <Stack
        enableScopedSelectors
        horizontal
        reversed
        disableShrink
        styles={stackStyles}
        tokens={horizontalGapStackTokens}
      >
        <span>Item One</span>
        <span>Item Two</span>
        <span>Item Three</span>
      </Stack>

      <span>Item alignments</span>
      <Stack
        enableScopedSelectors
        horizontal
        reversed
        disableShrink
        styles={itemAlignmentsStackStyles}
        tokens={itemAlignmentsStackTokens}
      >
        <Stack.Item align="auto" styles={stackItemStyles}>
          <span>Auto-aligned item</span>
        </Stack.Item>
        <Stack.Item align="stretch" styles={stackItemStyles}>
          <span>Stretch-aligned item</span>
        </Stack.Item>
        <Stack.Item align="baseline" styles={stackItemStyles}>
          <span>Baseline-aligned item</span>
        </Stack.Item>
        <Stack.Item align="start" styles={stackItemStyles}>
          <span>Start-aligned item</span>
        </Stack.Item>
        <Stack.Item align="center" styles={stackItemStyles}>
          <span>Center-aligned item</span>
        </Stack.Item>
        <Stack.Item align="end" styles={stackItemStyles}>
          <span>End-aligned item</span>
        </Stack.Item>
      </Stack>

      <span>Clickable stack</span>
      <Stack enableScopedSelectors horizontal onClick={_onClick} styles={stackStyles} tokens={clickableStackTokens}>
        <span>Click inside this box</span>
      </Stack>
    </Stack>
  );
};

function _onClick() {
  alert('Clicked Stack');
}
