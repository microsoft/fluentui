import * as React from 'react';
import { Markdown } from '@uifabric/example-app-base';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import {
  StaticListExample,
  StaticOrderedListExample,
  StaticListTableExample
  // StaticListAppendItemsExample
} from '../StaticList/StaticList.Example';

const rootClass = mergeStyles({
  marginTop: -20,
  padding: 40
});

export const GettingStartedPage: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <Markdown>{require<string>('!raw-loader!../../README.md')}</Markdown>
      <StaticListExample />
      <StaticOrderedListExample />
      <StaticListTableExample />
      {/* <StaticListAppendItemsExample /> */}
    </div>
  );
};
