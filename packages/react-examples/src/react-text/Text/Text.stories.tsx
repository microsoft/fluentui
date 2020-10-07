import { Flex } from '@fluentui/react-flex';
import { Text } from '@fluentui/react-text';
import * as React from 'react';

const Divider: React.FC = () => (
  <div style={{ borderBottom: '#D1D1D1 1px solid', marginBottom: 5, marginTop: 5, width: '100%' }} />
);

export const TextSizeStories = () => (
  <Flex column>
    <Text variant="caption">Hello I am Caption Regular Primary</Text>
    <Divider />

    <Text variant="body">Hello I am Body Regular Primary</Text>
    <Divider />

    <Text variant="subHeadline">I am Subheadline Semibold Primary</Text>
    <Text variant="headline">I am Headline Semibold Primary</Text>
    <Divider />

    <Text variant="title3">Title 3 Semibold Primary</Text>
    <Text variant="title2">Title 2 Semibold Primary</Text>
    <Text variant="title1">Title 1 Semibold Primary</Text>
    <Divider />

    <Text variant="largeTitle">Large Title Semibold Primary</Text>
    <Text variant="display">Display Semibold Primary</Text>
  </Flex>
);
