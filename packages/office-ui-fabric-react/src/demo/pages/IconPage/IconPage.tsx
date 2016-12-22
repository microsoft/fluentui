import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { IconBasicExample } from './examples/Icon.Basic.Example';
import { IconColorExample } from './examples/Icon.Color.Example';
import { IconImageSheetExample } from './examples/Icon.ImageSheet.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const IconBasicExampleCode = require('./examples/Icon.Basic.Example.tsx');
const IconColorExampleCode = require('./examples/Icon.Color.Example.tsx');
const IconImageSheetExampleCode = require('./examples/Icon.ImageSheet.Example.tsx');

export class IconPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Icon');
  }

  public render() {
    return (
      <ComponentPage
        title='Icon'
        componentName='IconExample'
        exampleCards={
          <div>
            <ExampleCard title='Icon' code={ IconBasicExampleCode }>
              <IconBasicExample />
            </ExampleCard>
            <ExampleCard title='Icon with custom color' code={ IconColorExampleCode }>
              <IconColorExample />
            </ExampleCard>
            <ExampleCard title='Icon using image sheet' code={ IconImageSheetExampleCode }>
              <IconImageSheetExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Icon' />
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
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
