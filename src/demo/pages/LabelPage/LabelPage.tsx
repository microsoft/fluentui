import * as React from 'react';
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
          <ExampleCard title='Label' code={ LabelBasicExampleCode }>
            <LabelBasicExample/>
          </ExampleCard>
        }
        propertiesTables={
            <PropertiesTableSet componentName='Label' />
        }
        overview={
          <div>
            <p>
              Labels give a name or title to a component or group of components. Labels should be in close proximity to the component or group they are paired with. Some components, such as TextField, Dropdown, or Toggle, already have Labels incorporated, but other components may optionally add a Label if it helps inform the user of the component’s purpose.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use sentence casing, e.g. “First name”.</li>
              <li>Be short and concise.</li>
              <li>When adding a Label to components, use the text as a noun or short noun phrase.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use Labels as instructional text, e.g. “Click to get started”.</li>
              <li>Don’t use full sentences or complex punctuation (colons, semicolons, etc.).</li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Label.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
