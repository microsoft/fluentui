import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { NavBasicExample } from './examples/Nav.Basic.Example';
import { NavFabricDemoAppExample } from './examples/Nav.FabricDemoApp.Example';
import { NavNestedExample } from './examples/Nav.Nested.Example';
import { NavByKeysExample } from './examples/Nav.ByKeys.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { NavStatus } from './Nav.checklist';

const NavBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Basic.Example.tsx') as string;
const NavFabricDemoAppExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.FabricDemoApp.Example.tsx') as string;
const NavNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.Nested.Example.tsx') as string;
const NavByKeysExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Nav/examples/Nav.ByKeys.Example.tsx') as string;

export class NavPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Nav'
        componentName='NavExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Nav'
        exampleCards={
          <div>
            <ExampleCard title='Basic Nav bar with sample links' code={ NavBasicExampleCode }>
              <NavBasicExample />
            </ExampleCard>
            <ExampleCard title='Navigation menu used in this Fabric React demo app' code={ NavFabricDemoAppExampleCode }>
              <NavFabricDemoAppExample />
            </ExampleCard>
            <ExampleCard title='Nested navigation menu (without group header)' code={ NavNestedExampleCode }>
              <NavNestedExample />
            </ExampleCard>
            <ExampleCard title='Nav bar of links each with unique keys and empty urls' code={ NavByKeysExampleCode }>
              <NavByKeysExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/Nav.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Nav/docs/NavDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...NavStatus }
          />
        }
      />
    );
  }

}
