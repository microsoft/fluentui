import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { ToggleBasicExample } from './examples/Toggle.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const ToggleBasicExampleCode = require('./examples/Toggle.Basic.Example.tsx');

export class TogglePage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Toggle');
  }

  public render() {
    return (
      <ComponentPage
        title='Toggle'
        componentName='ToggleExample'
        exampleCards={
          [
            <ExampleCard title='Toggle' code={ ToggleBasicExampleCode }>
              <ToggleBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Toggle' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Toggle'>Toggles</Link>
            <span> allow the user to turn an option on/off.</span>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
