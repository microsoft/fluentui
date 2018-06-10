import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';
import { ChoiceGroupBasicExample } from './examples/ChoiceGroup.Basic.Example';
import { ChoiceGroupCustomExample } from './examples/ChoiceGroup.Custom.Example';
import { ChoiceGroupImageExample } from './examples/ChoiceGroup.Image.Example';
import { ChoiceGroupIconExample } from './examples/ChoiceGroup.Icon.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ChoiceGroupStatus } from './ChoiceGroup.checklist';

const ChoiceGroupBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Basic.Example.tsx') as string;
const ChoiceGroupCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Custom.Example.tsx') as string;
const ChoiceGroupImageExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Image.Example.tsx') as string;
const ChoiceGroupIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/examples/ChoiceGroup.Icon.Example.tsx') as string;

export class ChoiceGroupPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ChoiceGroup'
        componentName='ChoiceGroupExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ChoiceGroup'
        exampleCards={
          <div>
            <ExampleCard title='Default ChoiceGroup' code={ ChoiceGroupBasicExampleCode }>
              <ChoiceGroupBasicExample />
            </ExampleCard>
            <ExampleCard title='ChoiceGroup with dropdown' code={ ChoiceGroupCustomExampleCode }>
              <ChoiceGroupCustomExample />
            </ExampleCard>
            <ExampleCard title='ChoiceGroups with images' code={ ChoiceGroupImageExampleCode }>
              <ChoiceGroupImageExample />
            </ExampleCard>
            <ExampleCard title='ChoiceGroup with icons' code={ ChoiceGroupIconExampleCode }>
              <ChoiceGroupIconExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        nativePropsElement={ 'input' }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/ChoiceGroup.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ChoiceGroup/docs/ChoiceGroupDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ChoiceGroupStatus }
          />
        }
      />
    );
  }
}
