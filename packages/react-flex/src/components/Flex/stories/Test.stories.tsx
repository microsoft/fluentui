import * as React from 'react';
import { Flex } from '../Flex';
import { FlexItem, FlexItemTokens } from '../../FlexItem';
import { FlexTokens } from '../Flex.types';

const containerTokens: FlexTokens = {
  background: 'lightred',
  gap: '10px 10px',
};

const flexTokens: FlexTokens = {
  background: 'lightblue',
  gap: '10px 10px',
};

const flexItemTokens: FlexItemTokens = {
  background: 'lightpink',
};

const containerStyles = {};

const flexStyles = {};

const flexItemStyles = {};

export const inlineFlex = () => (
  <Flex tokens={containerTokens} style={containerStyles}>
    <Flex tokens={flexTokens} style={flexStyles}>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>1</h2>
      </FlexItem>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>2</h2>
      </FlexItem>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>3</h2>
      </FlexItem>
    </Flex>
    <Flex tokens={flexTokens} style={flexStyles}>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>1</h2>
      </FlexItem>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>2</h2>
      </FlexItem>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>3</h2>
      </FlexItem>
    </Flex>
    <Flex tokens={flexTokens} style={flexStyles}>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>1</h2>
      </FlexItem>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>2</h2>
      </FlexItem>
      <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
        <h2>3</h2>
      </FlexItem>
    </Flex>
  </Flex>
);
