import * as React from 'react';
import { DefaultPalette } from 'office-ui-fabric-react';
import { Flex, FlexItem, FlexTokens } from '@fluentui/react-flex';

// Styles definition
const flexStyle = {
  background: DefaultPalette.themeTertiary,
};
const flexItemStyle = {
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  padding: 5,
};
const itemAlignmentsFlexStyles = {
  background: DefaultPalette.themeTertiary,
  height: 100,
};

// Tokens definition
const containerFlexTokens: FlexTokens = { gap: '5px' };
const horizontalGapFlexTokens = {
  gap: '10px',
  padding: '10px',
};
const itemAlignmentsFlexTokens = {
  gap: '5px',
  padding: '10px',
};
const clickableFlexTokens = {
  padding: '10px',
};

export const HorizontalFlexBasicExample: React.FunctionComponent = () => {
  return (
    <Flex column tokens={containerFlexTokens}>
      <span>Default horizontal flex</span>
      <Flex disableShrink style={flexStyle}>
        <span>Item One</span>
        <span>Item Two</span>
        <span>Item Three</span>
      </Flex>

      <span>Ordered flex</span>
      <Flex disableShrink style={flexStyle}>
        <FlexItem tokens={{ order: '2' }}>
          <span>Item One</span>
        </FlexItem>
        <FlexItem tokens={{ order: '3' }}>
          <span>Item Two</span>
        </FlexItem>
        <FlexItem tokens={{ order: '1' }}>
          <span>Item Three</span>
        </FlexItem>
      </Flex>

      <span>Horizontal gap between items</span>
      <Flex disableShrink style={flexStyle} tokens={horizontalGapFlexTokens}>
        <span>Item One</span>
        <span>Item Two</span>
        <span>Item Three</span>
      </Flex>

      <span>Item alignments</span>
      <Flex disableShrink style={itemAlignmentsFlexStyles} tokens={itemAlignmentsFlexTokens}>
        <FlexItem align="auto" style={flexItemStyle}>
          <span>Auto-aligned item</span>
        </FlexItem>
        <FlexItem align="stretch" style={flexItemStyle}>
          <span>Stretch-aligned item</span>
        </FlexItem>
        <FlexItem align="baseline" style={flexItemStyle}>
          <span>Baseline-aligned item</span>
        </FlexItem>
        <FlexItem align="start" style={flexItemStyle}>
          <span>Start-aligned item</span>
        </FlexItem>
        <FlexItem align="center" style={flexItemStyle}>
          <span>Center-aligned item</span>
        </FlexItem>
        <FlexItem align="end" style={flexItemStyle}>
          <span>End-aligned item</span>
        </FlexItem>
      </Flex>

      <span>Clickable flex</span>
      <Flex disableShrink onClick={_onClick} style={flexStyle} tokens={clickableFlexTokens}>
        <span>Click inside this box</span>
      </Flex>
    </Flex>
  );
};

function _onClick(): void {
  // eslint-disable-next-line no-alert
  alert('Clicked Flex');
}
