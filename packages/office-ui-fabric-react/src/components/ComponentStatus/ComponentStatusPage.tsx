import * as React from 'react';
import { ComponentPage, IComponentPageSection } from '@uifabric/example-app-base';
import { ComponentStatusState, ComponentStatusInfoState, IComponentStatusInfoState } from './ComponentStatusState';
import { ComponentStatus } from '@uifabric/example-app-base';
import './ComponentStatusPage.scss';

export class ComponentStatusPage extends React.Component<{}, {}> {
  public render() {
    let sections: [IComponentPageSection] = [{ title: 'Types of Badges', section: this._renderStatusesInfo() }, { title: 'Status', section: this._renderComponents() }];

    return (
      <ComponentPage
        title='Component Checklist'
        componentName='Component Checklist'
        overview={ this._renderOverView() }
        otherSections={ sections }
      >
      </ComponentPage >
    );
  }

  private _renderOverView(): JSX.Element {
    return <div>
      Component Status overview.
    </div>;
  }

  private _renderComponents(): JSX.Element {
    return <div>
      <ul className='componentList'>
        { Object.keys(ComponentStatusState).map((componentName, index) => {
          return this._renderComponent(componentName);
        }) }
      </ul>
    </div >;
  }

  private _renderComponent(componentName: string): JSX.Element {
    let component = ComponentStatusState[componentName];
    return <li className='componentListItem' key={ componentName + '-key' }>
      <h2> { componentName } </h2>
      <ComponentStatus
        {...component}
      >
      </ComponentStatus>
    </li>;
  }

  private _renderStatusesInfo() {
    return <div>
      <table className='componentTable'>
        <tr>
          <th className='componentCells'>Badge</th>
          <th className='componentCells'>Description</th>
          <th className='componentCells'>Success</th>
        </tr>
        { ComponentStatusInfoState.map((name) => {
          return this._renderStatusInfo(name);
        }) }
      </table>
    </div>;
  }

  private _renderStatusInfo(statusInfo: IComponentStatusInfoState) {
    return <tr key={ statusInfo.name + '-key' }>
      <td className='componentCells'> { statusInfo.name } </td>
      <td className='componentCells'> { statusInfo.description } </td>
      <td className='componentCells'> { statusInfo.steps } </td>
    </tr>;
  }
}
