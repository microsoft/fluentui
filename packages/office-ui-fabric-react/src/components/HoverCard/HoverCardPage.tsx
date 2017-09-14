import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';

import './HoverCardPage.scss';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;

export class HoverCardPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='HoverCard'
        componentName='HoverCardExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='HoverCard' code={ HoverCardBasicExampleCode }>
              <HoverCardBasicExample />
            </ExampleCard>
            <ExampleCard title='HoverCard using Target and at right center' code={ HoverCardTargetExampleCode }>
              <HoverCardTargetExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/HoverCard.Props.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/ExpandingCard.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/HoverCard'>HoverCards</Link>
            <span> supplement content associated with a specific data element.</span>
          </div>
        }
      />
    );
  }
}
