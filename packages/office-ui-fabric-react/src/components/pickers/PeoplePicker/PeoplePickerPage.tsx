import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PeoplePickerTypesExample } from './examples/PeoplePicker.Types.Example';
import { ComponentStatus } from '../../../demo/ComponentStatus/ComponentStatus';
import { PeoplePickerStatus } from './PeoplePicker.checklist';

const PeoplePickerTypesExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/examples/PeoplePicker.Types.Example.tsx') as string;

export class PeoplePickerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='PeoplePicker'
        componentName='PeoplePickerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/pickers/PeoplePicker'
        exampleCards={
          <div>
            <ExampleCard title='People Pickers' code={ PeoplePickerTypesExampleCode }>
              <PeoplePickerTypesExample />
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
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerBestPractices.md') }
          </PageMarkdown>
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/pickers/PeoplePicker/docs/PeoplePickerDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...PeoplePickerStatus }
          />
        }
      />
    );
  }

}