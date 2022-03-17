import * as React from 'react';
import { Overflow } from '../components/Overflow';
import { OverflowMenu, TestOverflowGroupDivider, TestOverflowItem } from './utils.stories';

export const Dividers = () => {
  return (
    <Overflow overflowDirection="start" padding={30}>
      <TestOverflowItem id={'1'} groupId={'1'} />
      <TestOverflowGroupDivider groupId={'1'} />
      <TestOverflowItem id={'2'} groupId={'2'} />
      <TestOverflowGroupDivider groupId={'2'} />
      <TestOverflowItem id={'3'} groupId={'3'} />
      <TestOverflowItem id={'4'} groupId={'3'} />
      <TestOverflowGroupDivider groupId={'3'} />
      <TestOverflowItem id={'5'} groupId={'4'} />
      <TestOverflowItem id={'6'} groupId={'4'} />
      <TestOverflowItem id={'7'} groupId={'4'} />
      <TestOverflowGroupDivider groupId={'4'} />
      <TestOverflowItem id={'8'} groupId={'5'} />
      <OverflowMenu
        itemIds={['1', 'divider-1', '2', 'divider-2', '3', '4', 'divider-3', '5', '6', '7', 'divider-4', '8']}
      />
    </Overflow>
  );
};
