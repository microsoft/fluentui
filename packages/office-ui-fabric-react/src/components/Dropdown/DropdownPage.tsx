import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { DropdownCustomExample } from './examples/Dropdown.Custom.Example';
import { DropdownErrorExample } from './examples/Dropdown.Error.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DropdownStatus } from './Dropdown.checklist';

const DropdownBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx') as string;
const DropdownErrorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Error.Example.tsx') as string;

export class DropdownPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Dropdown'
        componentName='DropdownExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Dropdown'
        exampleCards={
          <div>
            <ExampleCard
              title='Dropdown'
              code={ DropdownBasicExampleCode }
            >
              <DropdownBasicExample />
            </ExampleCard>

            <ExampleCard
              title='Customized Dropdown'
              code={ DropdownCustomExampleCode }
            >
              <DropdownCustomExample />
            </ExampleCard>
            <ExampleCard
              title='Dropdown with Error Message'
              code={ DropdownErrorExampleCode }
            >
              <DropdownErrorExample />
            </ExampleCard>
          </div>

        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/Dropdown.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/utilities/selectableOption/SelectableDroppableText.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...DropdownStatus }
          />
        }
      />
    );
  }
}
