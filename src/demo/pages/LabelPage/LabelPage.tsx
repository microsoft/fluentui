import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { LabelBasicExample } from './examples/Label.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const LabelBasicExampleCode = require('./examples/Label.Basic.Example.tsx');

export class LabelPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Label');
  }

  public render() {
    return (
      <ComponentPage
        title='Label'
        componentName='LabelExample'
        exampleCards={
          [
            <ExampleCard title='Label' code={ LabelBasicExampleCode }>
              <LabelBasicExample/>
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Label' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/label'>Labels</Link>
            <span> render a text string, styled as a label.</span>
          </div>
        }
        route={ this._url }
        showHeader={ this.props.showHeader }>
      </ComponentPage>
    );
  }
}
