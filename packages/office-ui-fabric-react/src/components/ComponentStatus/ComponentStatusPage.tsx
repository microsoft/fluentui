import * as React from 'react';
import { ComponentPage, IComponentPageSection } from '@uifabric/example-app-base';
import { ComponentStatusState, ComponentStatusInfoState, IComponentStatusInfoState } from './ComponentStatusState';
import { ComponentStatus } from '@uifabric/example-app-base';
import './ComponentStatusPage.scss';

export class ComponentStatusPage extends React.Component<{}, {}> {
  public render() {
    let sections: [IComponentPageSection] = [{ title: 'Status', section: this._renderComponents() }];

    return (
      <ComponentPage
        title='Component Checklist'
        componentName='Component Checklist'
        overview={ this._renderStatusesInfo() }
        otherSections={ sections }
      >
      </ComponentPage >
    );
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
      <ul>
        { ComponentStatusInfoState.map((name) => {
          return this._renderStatusInfo(name);
        }) }
      </ul>
    </div>;
  }

  private _renderStatusInfo(statusInfo: IComponentStatusInfoState) {
    return <li key={ statusInfo.name + '-key' } >
      <h2> { statusInfo.name } </h2>
      <h3> { statusInfo.description } </h3>
      <h3> { statusInfo.steps } </h3>
    </li>;
  }
}
