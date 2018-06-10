import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { HoverCardBasicExample } from './examples/HoverCard.Basic.Example';
import { HoverCardTargetExample } from './examples/HoverCard.Target.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { HoverCardStatus } from './HoverCard.checklist';

import './HoverCardPage.scss';

const HoverCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Basic.Example.tsx') as string;
const HoverCardTargetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/HoverCard/examples/HoverCard.Target.Example.tsx') as string;

export class HoverCardPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='HoverCard'
        componentName='HoverCardExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/HoverCard'
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
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/HoverCard.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/ExpandingCard.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/HoverCard/docs/HoverCardOverview.md') }
          </PageMarkdown>
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
