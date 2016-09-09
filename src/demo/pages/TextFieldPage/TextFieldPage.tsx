import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { TextFieldBasicExample } from './examples/TextField.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');

export class TextFieldPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'TextField');
  }

  public render() {
    return (
      <ComponentPage
        title='TextField'
        componentName='TextFieldExample'
        exampleCards={
          [
            <ExampleCard title='TextField variations' code={ TextFieldBasicExampleCode }>
              <TextFieldBasicExample />
            </ExampleCard>,
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='TextField' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/textfields'>TextFields</Link>
            <span> allow the user to enter text.</span>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
