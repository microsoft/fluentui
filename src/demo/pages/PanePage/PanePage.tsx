import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PaneBasicExample } from './examples/Pane.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PaneBasicExampleCode = require('./examples/Pane.Basic.Example.tsx');

export class PanePage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Pane');
  }

  public render() {
    return (
      <ComponentPage
        title='Pane'
        componentName='PaneExample'
        exampleCards={
          <div>
            <ExampleCard title='Pane - Small Pane, Anchored Right, Fixed Width' code={PaneBasicExampleCode}>
              <PaneBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Pane' />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/pane'>Panes</Link>
            <span> are used to render a split view.</span>
          </div>
        }
        route={this._url}
        isHeaderVisible={this.props.isHeaderVisible}>
      </ComponentPage>
    );
  }
}