import * as React from 'react';
import { DemoPage } from '../DemoPage';
import {
  StaticListExample,
  StaticOrderedListExample,
  StaticListAppendItemsExample,
  StaticListTableExample
} from '../../StaticList/StaticList.Example';

export const StaticListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    title="StaticList"
    examples={[StaticListExample, StaticOrderedListExample, StaticListTableExample, StaticListAppendItemsExample]}
  />
);
