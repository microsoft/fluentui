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
              In a computer's graphical user interface ( GUI ), an icon is an image that represents an application, a capability, or some other concept or specific entity with meaning for the user. An icon is usually selectable but can also be a nonselectable image such as a company's logo.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Adjust to proper size to highlight importance but not occupying too much space.</li>
              <li>Be simple and concise.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use Icons to show pictures.</li>
              <li>Use photos or long sentences as icons.</li>
            </ul>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
