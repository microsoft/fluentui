import * as React from 'react';
import { PageMarkdown } from '@uifabric/example-app-base';
import './GettingStartedPage.scss';

export const GettingStartedPage: React.StatelessComponent = () => {
  return (
    <div className="ms-GettingStartedPage">
      <div className="ms-GettingStartedPage-banner">
        <div className="ms-GettingStartedPage-title">
          <h1>office-ui-fabric-react</h1>
          <h3>A library of reusable, generic React components</h3>
        </div>
      </div>
      <PageMarkdown>{require<string>('!raw-loader!./docs/GettingStartedOverview.md')}</PageMarkdown>
    </div>
  );
};
