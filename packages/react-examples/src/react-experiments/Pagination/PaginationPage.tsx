import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';
import { Link } from '@fluentui/react/lib/Link';
import { PaginationButtonsBasicExample } from './Pagination.Buttons.Basic.Example';
import { PaginationButtonsCustomizationExample } from './Pagination.Buttons.Customization.Example';
import { PaginationButtonsCustomizationRoundExample } from './Pagination.Buttons.Customization.Round.Example';
import { PaginationComboBoxExample } from './Pagination.ComboBox.Example';
const PaginationButtonsBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Pagination/Pagination.Buttons.Basic.Example.tsx') as string;
const PaginationButtonsCustomizationExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Pagination/Pagination.Buttons.Customization.Example.tsx') as string;
const PaginationButtonsCustomizationRoundExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Pagination/Pagination.Buttons.Customization.Round.Example.tsx') as string;
const PaginationComboBoxExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Pagination/Pagination.ComboBox.Example.tsx') as string;

export class PaginationPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Pagination"
        componentName="PaginationExample"
        exampleCards={
          <div>
            <ExampleCard title="Pagination with combo box" code={PaginationComboBoxExampleCode}>
              <PaginationComboBoxExample />
            </ExampleCard>
            <ExampleCard title="Pagination with buttons" code={PaginationButtonsBasicExampleCode}>
              <PaginationButtonsBasicExample />
            </ExampleCard>
            <ExampleCard
              title="Pagination with buttons without the visible item label"
              code={PaginationButtonsCustomizationExampleCode}
            >
              <PaginationButtonsCustomizationExample />
            </ExampleCard>
            <ExampleCard
              title="Pagination with buttons and round background"
              code={PaginationButtonsCustomizationRoundExampleCode}
            >
              <PaginationButtonsCustomizationRoundExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Pagination/Pagination.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            <p>Pagination control</p>
            <p>
              This control provides a customizable pagination component that can be used to achieve specific design
              requirement.There are two design options: with a list of buttons, with combobox
            </p>
            <p>
              For cases when your application supports theming, Pagination component is equipped with everything you
              need to just load the custom theme to the application, and as long as the color palette you provide has an
              override for the{' '}
              <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/colors" underline>
                <code>Fabric colors</code>
              </Link>{' '}
              used in Pagination, everything should be ok. If no theming is supported, then follow the example showing
              the use of the <code>styles</code> prop.
            </p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
