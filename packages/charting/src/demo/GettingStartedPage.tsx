import * as React from 'react';
import { PageMarkdown } from '@uifabric/example-app-base';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const rootClass = mergeStyles({
  marginTop: -20,
  padding: 40
});

export const GettingStartedPage: React.StatelessComponent = () => {
  return (
    <div className={rootClass}>
      <PageMarkdown>{require<string>('!raw-loader!../../README.md')}</PageMarkdown>;
    </div>
  );
};
