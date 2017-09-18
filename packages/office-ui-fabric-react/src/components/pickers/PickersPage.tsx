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
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ComponentStatusState } from '../../demo/ComponentStatus/ComponentStatusState';

const TagPickerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/TagPicker.Basic.Example.tsx') as string;
const PickerCustomResultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/examples/Picker.CustomResult.Example.tsx') as string;

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
              require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/BasePicker.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Pickers'> Pickers </Link>
            <span> are used to pick recipients.</span>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Pickers}
          />
        }
      />
    );
  }

}
