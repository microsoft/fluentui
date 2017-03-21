import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PickerCustomResultExample } from './examples/Picker.CustomResult.Example';
import { TagPickerBasicExample } from './examples/TagPicker.Basic.Example';

const TagPickerExampleCode = require('!raw-loader!./examples/TagPicker.Basic.Example') as string;
const PickerCustomResultExampleCode = require('!raw-loader!./examples/Picker.CustomResult.Example') as string;

export class PickersPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Pickers'
        componentName='PickersExample'
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
              require<string>('!raw-loader!office-ui-fabric-react/lib/components/pickers/BasePicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Pickers'> Pickers </Link>
            <span> are used to pick recipients.</span>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
