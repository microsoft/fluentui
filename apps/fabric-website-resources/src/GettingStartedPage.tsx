import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
import './GettingStartedPage.scss';
import { PageMarkdown } from '@uifabric/example-app-base';

export class GettingStartedPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-GettingStartedPage">
        <div className="ms-GettingStartedPage-banner">
          <div className="ms-GettingStartedPage-title">
            <h1>office-ui-fabric-react</h1>
            <h3>A library of reusable, generic React components</h3>
          </div>
          {this._getEditButton()}
        </div>
        <PageMarkdown>{require<string>('!raw-loader!./docs/GettingStartedOverview.md')}</PageMarkdown>
      </div>
    );
  }
  private _getEditButton() {
    return (
      <TooltipHost
        key={`GettingStartedPage-editButton`}
        content={`Edit Getting Started Page on GitHub`}
        id={`GettingStartedPage-editButtonHost`}
      >
        <IconButton
          aria-describedby={`GettingStartedPage-editButtonHost`}
          iconProps={{ iconName: 'Edit' }}
          href="https://github.com/OfficeDev/office-ui-fabric-react/edit/master/apps/demo/src/docs/GettingStartedOverview.md"
          target="_blank"
          rel="noopener noreferrer"
        />
      </TooltipHost>
    );
  }
}
