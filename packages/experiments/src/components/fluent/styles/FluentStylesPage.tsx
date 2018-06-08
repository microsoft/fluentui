import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { FluentStylesBasicExample } from './examples/FluentStyles.Basic.Examples';

export class FluentStylesPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Fluent Component Styles"
        componentName="FluentStyles"
        overview={
          <div>
            <p>@todo</p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        exampleCards={
          <div>
            <ExampleCard title="Using Customizer to theme components">
              <FluentStylesBasicExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
