import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';

const OverflowSetBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;

export class OverflowSetPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='OverflowSet'
        componentName='OverflowSetExample'
        overview={
          <div>
            <p>
              The Overflow Set component is a flexible container component that is usefull for displaying a primary set of content with additional content in an overflow callout.
              Note that the example below is only an example of how to render the component, not a specific use case.
            </p>
          </div>
        }
        exampleCards={
          <LayerHost>
            <ExampleCard title='OverflowSet' code={ OverflowSetBasicExampleCode }>
              <OverflowSetBasicExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/OverflowSet.Props.ts')
            ] }
          />
        }
      />
    );
  }
}
