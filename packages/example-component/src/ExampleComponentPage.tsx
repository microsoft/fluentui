import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  // PropertiesTableSet
} from '@uifabric/example-app-base';

import { ExampleComponentBasicExample } from './examples/ExampleComponent.Basic.Example';

// const LabelBasicExampleCode = require('./examples/Label.Basic.Example.tsx') as string;

export class ExampleComponentPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ExampleComponent'
        componentName='ExampleComponentBasicExample'
        exampleCards={
          <ExampleCard title='ExampleComponent Basic Example'>
            <ExampleComponentBasicExample />
          </ExampleCard>
        }
        overview={
          <div>
            <p>
              Lorem ipsum dolar.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Lorem ipsum dolar.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Lorem ipsum dolar.</li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Label/Label.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
