import * as React from 'react';
import { ExampleCard, ComponentPage, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { PaginationBasicExample } from './examples/Pagination.Basic.Example';
import { PaginationCustomizationExample } from './examples/Pagination.Customization.Example';
import { PaginationCustomizationRoundExample } from './examples/Pagination.Customization.Round.Example';

const PaginationBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Pagination/examples/Pagination.Basic.Example.tsx') as string;
const PaginationCustomizationExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Pagination/examples/Pagination.Customization.Example.tsx') as string;
const PaginationCustomizationRoundExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Pagination/examples/Pagination.Customization.Round.Example.tsx') as string;

export class PaginationPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Pagination"
        componentName="PaginationExample"
        exampleCards={
          <div>
            <ExampleCard title="Pagination with basic elements" code={PaginationBasicExampleCode}>
              <PaginationBasicExample />
            </ExampleCard>
            <ExampleCard title="Pagination with customization" code={PaginationCustomizationExampleCode}>
              <PaginationCustomizationExample />
            </ExampleCard>
            <ExampleCard title="Pagination with customization using round background" code={PaginationCustomizationRoundExampleCode}>
              <PaginationCustomizationRoundExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Pagination/Pagination.types.ts')]}
          />
        }
        overview={
          <div>
            <p>Pagination control</p>
            <p>This control provides a customizable pagination component that can be used to achieve specific design requirement.</p>
            <p>
              For cases when your application supports theming, Pagination component is equiped with everything you need to just load the
              custom theme to the application, and as long as the color palette you provide has an overried for the{' '}
              <Link href="https://developer.microsoft.com/en-us/fabric#/styles/colors">
                <code>Fabric colors</code>
              </Link>{' '}
              used in Pagination, everything should be ok. If no theming is supported, then follow the example showing the use of the{' '}
              <code>styles</code> prop.
            </p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
