import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { items } from '../CommandBar/examples/data';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { CalloutNestedExample } from './examples/Callout.Nested.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { CalloutStatus } from './Callout.checklist';

const CalloutBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Basic.Example.tsx') as string;
const CalloutNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Nested.Example.tsx') as string;
const CalloutDirectionalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Directional.Example.tsx') as string;
const CalloutCoverExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Callout/examples/Callout.Cover.Example.tsx') as string;

export class CalloutPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    const cmdBarParamsTextAndIcons: any = { items: items, farItems: null };

    return (
      <ComponentPage
        title='Callout'
        componentName='CalloutExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Callout'
        exampleCards={
          <div>
            <ExampleCard title='Default Callout' code={ CalloutBasicExampleCode }>
              <CalloutBasicExample />
            </ExampleCard>
            <ExampleCard title='Nested Callout... Callout with a commandbar with a sub menu' code={ CalloutNestedExampleCode }>
              <CalloutNestedExample { ...cmdBarParamsTextAndIcons } />
            </ExampleCard>
            <ExampleCard title='Callout with directional hint' code={ CalloutDirectionalExampleCode }>
              <CalloutDirectionalExample />
            </ExampleCard>
            <ExampleCard title='Callout with cover' code={ CalloutCoverExampleCode }>
              <CalloutCoverExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <div>
            <PropertiesTableSet
              sources={ [
                require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/Callout.types.ts')
              ] }
            />
            <p>Besides the above properties, the <code>Callout</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
          </div>
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Callout/docs/CalloutDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...CalloutStatus }
          />
        }
      />
    );
  }
}