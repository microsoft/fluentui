import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { FacepileBasicExample } from './examples/Facepile.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const FacepileBasicExampleCode = require('./examples/Facepile.Basic.Example.tsx');

export class FacepilePage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Facepile');
  }

  public render() {
    return (
      <ComponentPage
        title='Facepile'
        componentName='FacepileExample'
        exampleCards={
          [
            <ExampleCard title='Facepile' code={ FacepileBasicExampleCode }>
              <FacepileBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Facepile' />
          ]
        }
        overview={
          <div>A control for managing people through a panel.</div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/FacePile.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
