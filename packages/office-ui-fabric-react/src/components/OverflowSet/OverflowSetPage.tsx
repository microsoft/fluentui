import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';

const OverflowSetBasicExampleCode = require('!raw-loader!./examples/OverflowSet.Basic.Example.tsx') as string;

export class OverflowSetPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='OverflowSet'
        componentName='OverflowSetExample'
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
              require<string>('office-ui-fabric-react/lib/components/OverflowSet/OverflowSet.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/OverflowSet'>OverflowSets</Link>
            <span> supplement content associated with a specific UI component.</span>
          </div>
        }
      />
    );
  }
}
