import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ShimmerLoadDataExample } from './examples/Shimmer.LoadData.Example';
import { ShimmerApplicationExample } from 'experiments/lib/components/Shimmer/examples/Shimmer.Application.Example';

const ShimmerBasicExampleCode = require('!raw-loader!experiments/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx') as string;
// tslint:disable-next-line:max-line-length
const ShimmerLoadDataExampleCode = require('!raw-loader!experiments/src/components/Shimmer/examples/Shimmer.LoadData.Example.tsx') as string;
// tslint:disable-next-line:max-line-length
const ShimmerApplicationExampleCode = require('!raw-loader!experiments/src/components/Shimmer/examples/Shimmer.Application.Example.tsx') as string;

export class ShimmerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Shimmer'
        componentName='ShimmerExample'
        exampleCards={
          <div>
            <ExampleCard
              title='Basic Shimmer'
              code={ ShimmerBasicExampleCode }
            >
              <ShimmerBasicExample />
            </ExampleCard>
            <ExampleCard
              title='Enabling Data Shimmer'
              code={ ShimmerLoadDataExampleCode }
            >
              <ShimmerLoadDataExample />
            </ExampleCard>
            <ExampleCard
              title='Details List with 1000 items loading in async way.'
              code={ ShimmerApplicationExampleCode }
            >
              <ShimmerApplicationExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/Shimmer/Shimmer.types.ts')
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
