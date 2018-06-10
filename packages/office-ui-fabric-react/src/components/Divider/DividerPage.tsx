import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { VerticalDividerBasicExample } from './examples/VerticalDivider.Basic.Example';
import { VerticalDividerCustomExample } from './examples/VerticalDivider.Custom.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DividerStatus } from './Divider.checklist';

const VerticalDividerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Basic.Example.tsx') as string;

const VerticalDividerCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Custom.Example.tsx') as string;

export class DividerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Divider'
        componentName='DividerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Divider'
        exampleCards={
          <div>
            <ExampleCard title='Vertical Divider' code={ VerticalDividerBasicExampleCode }>
              <VerticalDividerBasicExample />
            </ExampleCard>
            <ExampleCard title='Custom Vertical Divider' code={ VerticalDividerCustomExampleCode }>
              <VerticalDividerCustomExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/VerticalDivider.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerBestPractices.md') }
          </PageMarkdown>
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/docs/DividerDonts.md') }
          </PageMarkdown>

        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...DividerStatus }
          />
        }
      />
    );
  }
}
