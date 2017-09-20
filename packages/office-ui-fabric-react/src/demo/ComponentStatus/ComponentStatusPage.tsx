import * as React from 'react';
import { ComponentPage, IComponentPageSection } from '@uifabric/example-app-base';
import { Link } from '../../Link';
import { AllComponentsStatus } from './AllComponents.checklist';
import { ComponentStatusInfoState, IComponentStatusInfoState, InformationLink } from './ComponentStatusState';
import { ComponentStatus } from './ComponentStatus';
import './ComponentStatusPage.scss';

export class ComponentStatusPage extends React.Component<{}, {}> {
  public render() {
    let sections: [IComponentPageSection] = [{ title: 'Badges', section: this._renderStatusesInfo() }, { title: 'Status', section: this._renderComponents() }];

    return (
      <ComponentPage
        title='Components Checklist'
        componentName='Components Checklist'
        overview={ this._renderOverView() }
        otherSections={ sections }
      />
    );
  }

  private _renderOverView(): JSX.Element {
    return (
      <div>
        Badges are used to track a component's status regarding different criteria. They reflect if a component is localizable, accessible and reliable.
    </div>
    );
  }

  private _renderComponents(): JSX.Element {
    return (
      <div>
        <table className='componentTable'>
          <tbody>
            { Object.keys(AllComponentsStatus).map((componentName, index) => {
              return this._renderComponent(componentName);
            }) }
          </tbody>
        </table>
      </div >
    );
  }

  private _renderComponent(componentName: string): JSX.Element {
    let component = AllComponentsStatus[componentName];
    return (
      <tr key={ componentName + '-key' }>
        <th className='componentCells'><h3>{ componentName } </h3> </th>
        <td className='componentBadgeCell'><ComponentStatus
          {...component}
        /></td>
      </tr >
    );
  }

  private _renderStatusesInfo() {
    return (
      <div>
        <table className='componentTable'>
          <tbody>
            <tr>
              <th className='componentCells'>Name</th>
              <th className='componentCells'>Description</th>
              <th className='componentCells'>Success</th>
            </tr>
            { ComponentStatusInfoState.map((name) => {
              return this._renderStatusInfo(name);
            }) }
          </tbody>
        </table>
      </div>
    );
  }

  private _renderStatusInfo(statusInfo: IComponentStatusInfoState) {
    return (
      <tr key={ statusInfo.name + '-key' }>
        <th className='componentCells'> { statusInfo.name } </th>
        <td className='componentCells'> { statusInfo.description } </td>
        <td className='componentCells'> { statusInfo.success }
          { statusInfo.link && this._createLink(statusInfo.link) }
        </td>
      </tr>
    );
  }

  private _createLink(information: InformationLink): JSX.Element {
    return (
      <Link
        href={ information.link }
      >
        { ' ' + information.renderedText }
      </Link>
    );
  }
}
