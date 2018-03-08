import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { HoverCardStatus } from './HoverCard.checklist';
import { MessageBar } from '../../MessageBar';

import './HoverCardPage.scss';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;

export class HoverCardPage extends React.Component<IComponentDemoPageProps, any> {
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
          <div>
            <MessageBar>
              <strong>Native Props Allowed</strong> - all html attributes native to the <code>&lt;div&gt;</code> tag, including all data and aria attributes, can be applied as native props on this component.
            </MessageBar>
            <PropertiesTableSet
              sources={ [
                require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/HoverCard.types.ts'),
                require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/ExpandingCard.types.ts')
              ] }
            />
          </div>
        }
        overview={
          <div>
            <p>HoverCards supplement content associated with a specific data element.</p>
          </div>
        }
        componentStatus={
          <ComponentStatus
            { ...HoverCardStatus }
          />
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
