import * as React from 'react';
import { DefaultPalette } from '@fluentui/react';
import { Flex, FlexItem, FlexTokens } from '@fluentui/react-flex';

// Styles definition
const flexStyles = {
  background: DefaultPalette.themeTertiary,
};
const flexItemStyles = {
  alignItems: 'center',
  background: DefaultPalette.themePrimary,
  color: DefaultPalette.white,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
};

// Tokens definition
const flexTokens: FlexTokens = {
  gap: '5px',
  padding: '10px',
};

export const HorizontalFlexGrowExample: React.FunctionComponent = () => {
  return (
    <Flex style={flexStyles} tokens={flexTokens}>
      <FlexItem tokens={{ grow: '3' }} style={flexItemStyles}>
        Grow is 3
      </FlexItem>
      <FlexItem tokens={{ grow: '2' }} style={flexItemStyles}>
        Grow is 2
      </FlexItem>
      <FlexItem tokens={{ grow: '1' }} style={flexItemStyles}>
        Grow is 1
      </FlexItem>
    </Flex>
  );
};
