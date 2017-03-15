import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { OverflowGroupBasicExample } from './examples/OverflowGroup.Basic.Example';

import './OverflowGroupPage.scss';

const OverflowGroupBasicExampleCode = require('./examples/OverflowGroup.Basic.Example.tsx') as string;

export class OverflowGroupPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='OverflowGroup'
        componentName='OverflowGroupExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='OverflowGroup' code={ OverflowGroupBasicExampleCode }>
              <OverflowGroupBasicExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/OverflowGroup/OverflowGroup.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/OverflowGroup'>OverflowGroups</Link>
            <span> supplement content associated with a specific UI component.</span>
          </div>
        }
      />
    );
  }
}
