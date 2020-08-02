import * as React from 'react';
import { Flex } from '../Flex';
import { FlexItem, FlexItemTokens } from '../../FlexItem';
import { FlexTokens } from '../Flex.types';

const containerTokens: FlexTokens = {
  gap: '10px',
  padding: '10px',
};

const flexTokens: FlexTokens = {
  gap: '10px',
  padding: '10px',
};

const flexItemTokens: FlexItemTokens = {};

const containerStyles = {
  backgroundColor: 'lightgreen',
  maxHeight: '300px',
  maxWidth: '300px',
};

const flexStyles = {
  backgroundColor: 'lightblue',
};

const flexItemStyles = {
  backgroundColor: 'lightpink',
};

export const inlineFlex = () => (
  <Flex>
    <Flex tokens={containerTokens} style={containerStyles}>
      <Flex reverse disableShrink tokens={flexTokens} style={flexStyles}>
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
          <h2>4</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>5</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>6</h2>
        </FlexItem>
      </Flex>
      <Flex tokens={flexTokens} style={flexStyles}>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>7</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>8</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>9</h2>
        </FlexItem>
      </Flex>
    </Flex>
    <Flex column tokens={containerTokens} style={containerStyles}>
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
          <h2>4</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>5</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>6</h2>
        </FlexItem>
      </Flex>
      <Flex tokens={flexTokens} style={flexStyles}>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>7</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>8</h2>
        </FlexItem>
        <FlexItem tokens={flexItemTokens} style={flexItemStyles}>
          <h2>9</h2>
        </FlexItem>
      </Flex>
    </Flex>
  </Flex>
);
