import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { FacepileBasicExample } from './examples/Facepile.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/app/AppState';

const FacepileBasicExampleCode = require('./examples/Facepile.Basic.Example.tsx');

export class FacepilePage extends React.Component<any, any> {
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
        route={ this._url }>
      </ComponentPage>
    );
  }
}
