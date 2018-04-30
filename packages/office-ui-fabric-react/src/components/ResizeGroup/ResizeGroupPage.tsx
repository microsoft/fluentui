import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ResizeGroupOverflowSetExample } from './examples/ResizeGroup.OverflowSet.Example';
import { FlexBoxResizeGroupExample } from './examples/ResizeGroup.FlexBox.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ResizeGroupStatus } from './ResizeGroup.checklist';

const ResizeGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.OverflowSet.Example.tsx') as string;

const ResizeGroupFlexBoxExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/examples/ResizeGroup.FlexBox.Example.tsx') as string;

export class ResizeGroupPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ResizeGroup'
        componentName='ResizeGroupExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ResizeGroup'
        exampleCards={
          <LayerHost>
            <ExampleCard title='Use ResizeGroup to move commands into an overflow menu' code={ ResizeGroupBasicExampleCode }>
              <ResizeGroupOverflowSetExample />
            </ExampleCard>
            <ExampleCard title='Use ResizeGroup to prevent two groups of items from overlapping' code={ ResizeGroupFlexBoxExampleCode }>
              <FlexBoxResizeGroupExample />
            </ExampleCard>
          </LayerHost>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/ResizeGroup.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ResizeGroup/docs/ResizeGroupDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ResizeGroupStatus }
          />
        }
      />
    );
  }
}
