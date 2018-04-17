import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { OverflowSetCustomExample } from './examples/OverflowSet.Custom.Example';
import { OverflowSetBasicExample } from './examples/OverflowSet.Basic.Example';
import { OverflowSetVerticalExample } from './examples/OverflowSet.Vertical.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { OverflowSetStatus } from './OverflowSet.checklist';

const OverflowSetCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Custom.Example.tsx') as string;
const OverflowSetBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Basic.Example.tsx') as string;
const OverflowSetVerticalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/examples/OverflowSet.Vertical.Example.tsx') as string;

export class OverflowSetPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='OverflowSet'
        componentName='OverflowSetExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/OverflowSet'
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/docs/OverflowSetOverview.md') }
          </PageMarkdown>
        }
        exampleCards={
          <LayerHost>
            <ExampleCard title='OverflowSet Basic Example' code={ OverflowSetBasicExampleCode }>
              <OverflowSetBasicExample />
            </ExampleCard>
            <ExampleCard title='OverflowSet Vertical Example' code={ OverflowSetVerticalExampleCode }>
              <OverflowSetVerticalExample />
            </ExampleCard>
            <ExampleCard title='OverflowSet Custom Example' code={ OverflowSetCustomExampleCode }>
              <OverflowSetCustomExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/OverflowSet/OverflowSet.types.ts')
            ] }
          />
        }
        componentStatus={
          <ComponentStatus
            { ...OverflowSetStatus }
          />
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
