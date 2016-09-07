import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { SpinnerBasicExample } from './examples/Spinner.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const SpinnerBasicExampleCode = require('./examples/Spinner.Basic.Example.tsx');

export class SpinnerPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Spinner');
  }

  public render() {
    return (
      <ComponentPage
        title='Spinner'
        componentName='SpinnerExample'
        exampleCards={
          [
            <ExampleCard
              title='Various Spinner Types'
              code={ SpinnerBasicExampleCode }>
              <SpinnerBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Spinner' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Spinner'>Spinners</Link>
            <span> provide a ui indicator for progress.</span>
          </div>
        }
        route={ this._url }
        showHeader={ this.props.showHeader }>
      </ComponentPage>
    );
  }
}
