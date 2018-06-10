
import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { LayerBasicExample } from './examples/Layer.Basic.Example';
import { LayerHostedExample } from './examples/Layer.Hosted.Example';
import { LayerCustomizedExample } from './examples/Layer.Customized.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { LayerStatus } from './Layer.checklist';

const LayerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Basic.Example.tsx') as string;
const LayerHostedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Hosted.Example.tsx') as string;
const LayerCustomizedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Layer/examples/Layer.Customized.Example.tsx') as string;

export class LayerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Layer'
        componentName='LayerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Layer'
        exampleCards={
          <div>
            <ExampleCard title='Basic layered content' code={ LayerBasicExampleCode }>
              <LayerBasicExample />
            </ExampleCard>
            <ExampleCard title='Using LayerHost to control projection' code={ LayerHostedExampleCode }>
              <LayerHostedExample />
            </ExampleCard>
            <ExampleCard title='Using Customizer to control the default layer behavior' code={ LayerCustomizedExampleCode }>
              <LayerCustomizedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/Layer.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Layer/docs/LayerDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...LayerStatus }
          />
        }
      />
    );
  }
}
