import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DividerBasicExample } from './examples/Divider.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DividerStatus } from './Divider.checklist';

const DividerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/Divider.Basic.Example.tsx') as string;

export class DividerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Divider'
        componentName='DividerExample'
        exampleCards={
          <div>
            <ExampleCard title='Divider' code={ DividerBasicExampleCode }>
              <DividerBasicExample />
            </ExampleCard>
          </div>

        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/Divider.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Divider is a line that is used to visually differentiate different parts of a UI. They are commonly used in menus, headers, and command bars.
            </p>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...DividerStatus}
          />
        }
      />
    );
  }
}
