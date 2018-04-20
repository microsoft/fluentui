import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PickerCustomResultExample } from './examples/Picker.CustomResult.Example';
import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { PickersStatus } from './Pickers.checklist';

const TagPickerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/TagPicker.Basic.Example.tsx') as string;
const PickerCustomResultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/Picker.CustomResult.Example.tsx') as string;

export class PickersPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Pickers'
        componentName='PickersExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/pickers'
        exampleCards={
          <div>
            <ExampleCard title='Tag Picker' code={ TagPickerExampleCode }>
              <TagPickerBasicExample />
            </ExampleCard>
            <ExampleCard title='Custom Picker (Document Picker)' code={ PickerCustomResultExampleCode }>
              <PickerCustomResultExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/BasePicker.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/docs/PickersOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...PickersStatus }
          />
        }
      />
    );
  }

}
