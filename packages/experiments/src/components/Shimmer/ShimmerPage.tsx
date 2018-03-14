import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ShimmerLoadDataExample } from './examples/Shimmer.LoadData.Example';

const ShimmerBasicExampleCode = require('!raw-loader!experiments/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx') as string;
// tslint:disable-next-line:max-line-length
const ShimmerLoadDataExampleCode = require('!raw-loader!experiments/src/components/Shimmer/examples/Shimmer.LoadData.Example.tsx') as string;

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
                When construncting a shimmer line using different elements like Circle, Rectangle or Gap, best if providing widths for each
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
                Thinking... )
              </li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
