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
import { TextFieldErrorMessageExample } from './examples/TextField.ErrorMessage.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');
const TextFieldErrorMessageExampleCode = require('./examples/TextField.ErrorMessage.Example.tsx');

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
            <ExampleCard title='TextField error message variations' code={ TextFieldErrorMessageExampleCode }>
              <TextFieldErrorMessageExample />
            </ExampleCard>
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
        showHeader={ this.props.showHeader }>
      </ComponentPage>
    );
  }
}
