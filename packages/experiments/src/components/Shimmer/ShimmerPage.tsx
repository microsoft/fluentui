import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ShimmerCustomElementsExample } from './examples/Shimmer.CustomElements.Example';
import { ShimmerLoadDataExample } from './examples/Shimmer.LoadData.Example';
import { ShimmerApplicationExample } from './examples/Shimmer.Application.Example';
import { ShimmerStylingExample } from './examples/Shimmer.Styling.Example';

const ShimmerBasicExampleCode = require(
  '!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx'
) as string;

const ShimmerCustomExampleCode = require(
  '!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.CustomElements.Example.tsx'
) as string;

const ShimmerStylingExampleCode = require(
  '!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.Styling.Example.tsx'
) as string;

const ShimmerLoadDataExampleCode = require(
  '!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.LoadData.Example.tsx'
) as string;

const ShimmerApplicationExampleCode = require(
  '!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.Application.Example.tsx'
) as string;

export class ShimmerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Shimmer'
        componentName='ShimmerExample'
        exampleCards={
          <div>
            <ExampleCard
              title='Shimmer with basic elements using the "shimmerElements" prop'
              code={ ShimmerBasicExampleCode }
            >
              <ShimmerBasicExample />
            </ExampleCard>
            <ExampleCard
              title='Shimmer with custom elements using the "customElementsGroup" prop'
              code={ ShimmerCustomExampleCode }
            >
              <ShimmerCustomElementsExample />
            </ExampleCard>
            <ExampleCard
              title='Shimmer swapping with the content it replaces'
              code={ ShimmerLoadDataExampleCode }
            >
              <ShimmerLoadDataExample />
            </ExampleCard>
            <ExampleCard
              title='Details List with 500 items simulating loading data in async manner and having Shimmer enabled.'
              code={ ShimmerApplicationExampleCode }
            >
              <ShimmerApplicationExample />
            </ExampleCard>
            <ExampleCard
              title='Style override of shimmering wave using "getStyles" prop'
              code={ ShimmerStylingExampleCode }
            >
              <ShimmerStylingExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!@uifabric/experiments/src/components/Shimmer/Shimmer.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Shimmer is a temporary animation placeholder for the upcoming data from an API call
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>
                When construncting a shimmer line using different elements like Circle, Line or Gap, best if providing widths for each
                of them to experience a better layout looking as close as possible to real data it is replacing.
              </li>
              <li>
                Try avoiding multiple shimmer lines of different widths. Each shimmer line is it's own animation and it is dependent on the
                width you provide. So for a better visual animation keep the widths consistent.
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>
                Do not try using on the same element both types of widths. It will always default to just one of them.
              </li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
