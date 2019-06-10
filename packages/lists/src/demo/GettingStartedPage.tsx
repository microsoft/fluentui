import * as React from 'react';
import { Markdown } from '@uifabric/example-app-base';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { StaticListExample, StaticListAppendItemsExample, StaticListTableExample } from '../StaticList/StaticList.Example';

const rootClass = mergeStyles({
  marginTop: -20,
  padding: 40
});

export const GettingStartedPage: React.FunctionComponent = () => {
  return (
    <div className={rootClass}>
      <StaticListAppendItemsExample />
      <StaticListExample />
      <StaticListTableExample />
      <Markdown>{require<string>('!raw-loader!../../README.md')}</Markdown>
    </div>
  );
};
