import * as React from 'react';
import { ComponentPage, IComponentPageSection, PageMarkdown } from '@uifabric/example-app-base';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { AllComponentsStatus } from './AllComponents.checklist';
import { ComponentStatusInfoState, IComponentStatusInfoState, InformationLink } from './ComponentStatusState';
import { ComponentStatus } from './ComponentStatus';
import './ComponentStatusPage.scss';

export class ComponentStatusPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const sections: IComponentPageSection[] = [
      { title: 'Badges', section: this._renderStatusesInfo() },
      { title: 'Status', section: this._renderComponents() }
    ];

    return (
      <ComponentPage
        title="Components Checklist"
        componentName="Components Checklist"
        editOverviewUrl="https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/demo/src/ComponentStatus/docs/ComponentChecklistOverview.md"
        overview={this._renderOverView()}
        otherSections={sections}
      />
    );
  }

  private _renderOverView(): JSX.Element {
    return <PageMarkdown>{require<string>('!raw-loader!./docs/ComponentChecklistOverview.md')}</PageMarkdown>;
  }

  private _renderComponents(): JSX.Element {
    return (
      <div>
        <table className="componentTable">
          <tbody>
            {Object.keys(AllComponentsStatus).map((componentName: string, index: number) => {
              return this._renderComponent(componentName);
            })}
          </tbody>
        </table>
      </div>
    );
  }

  private _renderComponent(componentName: string): JSX.Element {
    const component = AllComponentsStatus[componentName];
    return (
      <tr key={componentName + '-key'}>
        <th className="componentCells">
          <h3>{componentName} </h3>{' '}
        </th>
        <td className="componentBadgeCell">
          <ComponentStatus {...component} />
        </td>
      </tr>
    );
  }

  private _renderStatusesInfo(): JSX.Element {
    return (
      <div>
        <table className="componentTable">
          <tbody>
            <tr>
              <th className="componentCells">Name</th>
              <th className="componentCells">Description</th>
              <th className="componentCells">Success</th>
            </tr>
            {ComponentStatusInfoState.map((name: IComponentStatusInfoState) => {
              return this._renderStatusInfo(name);
            })}
          </tbody>
        </table>
      </div>
    );
  }

  private _renderStatusInfo(statusInfo: IComponentStatusInfoState): JSX.Element {
    return (
      <tr key={statusInfo.name + '-key'}>
        <th className="componentCells"> {statusInfo.name} </th>
        <td className="componentCells"> {statusInfo.description} </td>
        <td className="componentCells">
          {' '}
          {statusInfo.success}
          {statusInfo.link && this._createLink(statusInfo.link)}
        </td>
      </tr>
    );
  }

  private _createLink(information: InformationLink): JSX.Element {
    return <Link href={information.link}>{' ' + information.renderedText}</Link>;
  }
}
