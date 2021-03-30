import * as React from 'react';
import { Flex } from '@fluentui/react-flex';
import * as classes from './Flex.stories.scss';
import { CSSProperties } from 'react';

const debugStyle: CSSProperties = { backgroundColor: 'gray', padding: '10px' };

export const Base = () => (
  <Flex style={debugStyle}>
    <span style={{ backgroundColor: 'red' }}>item 1</span>
    <span style={{ backgroundColor: 'red' }}>item 2</span>
  </Flex>
);

export const Direction = () => (
  <Flex style={debugStyle} direction="row-reversed">
    <span style={{ backgroundColor: 'red' }}>item 1</span>
    <span style={{ backgroundColor: 'red' }}>item 2</span>
  </Flex>
);
