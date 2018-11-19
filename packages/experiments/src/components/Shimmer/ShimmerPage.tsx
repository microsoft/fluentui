import * as React from 'react';
import { ExampleCard, ComponentPage, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ShimmerCustomElementsExample } from './examples/Shimmer.CustomElements.Example';
import { ShimmerLoadDataExample } from './examples/Shimmer.LoadData.Example';
import { ShimmerApplicationExample } from './examples/Shimmer.Application.Example';
import { ShimmerStylingExample } from './examples/Shimmer.Styling.Example';

const ShimmerBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx') as string;

const ShimmerCustomExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.CustomElements.Example.tsx') as string;

const ShimmerStylingExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.Styling.Example.tsx') as string;

const ShimmerLoadDataExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.LoadData.Example.tsx') as string;

const ShimmerApplicationExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Shimmer/examples/Shimmer.Application.Example.tsx') as string;

export class ShimmerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Shimmer"
        componentName="ShimmerExample"
        exampleCards={
          <div>
            <ExampleCard title="Shimmer with basic elements using the &quot;shimmerElements&quot; prop" code={ShimmerBasicExampleCode}>
              <ShimmerBasicExample />
            </ExampleCard>
            <ExampleCard
              title="Shimmer with custom elements using the &quot;customElementsGroup&quot; prop"
              code={ShimmerCustomExampleCode}
            >
              <ShimmerCustomElementsExample />
            </ExampleCard>
            <ExampleCard title="Shimmer swapping with the content it replaces" code={ShimmerLoadDataExampleCode}>
              <ShimmerLoadDataExample />
            </ExampleCard>
            <ExampleCard
              title="Details List with 500 items simulating loading data in async manner and having Shimmer enabled."
              code={ShimmerApplicationExampleCode}
            >
              <ShimmerApplicationExample />
            </ExampleCard>
            <ExampleCard title="Style override of shimmering wave using &quot;styles&quot; prop" code={ShimmerStylingExampleCode}>
              <ShimmerStylingExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Shimmer/Shimmer.types.ts')]} />
        }
        overview={
          <div>
            <p>
              Shimmer is a temporary animation placeholder for when data from the service call takes time to get back and we don't want to
              block rendering the rest of the UI.
            </p>
            <p>
              When Shimmer is not wrapping the actual component to be rendered while data is fetching, <code>shimmerElements</code> or{' '}
              <code>customElementsGroup</code> props should be used, and later just replace the Shimmer UI with the intended content.
              Otherwise, if smooth transition from Shimmer UI to content is wanted, wrap the content node with Shimmer tags and use{' '}
              <code>isDataLoaded</code> prop to trigger the transition. For reference use the examples provided below.
            </p>
            <p>
              For cases when your application supports theming, Shimmer component is equiped with everything you need to just load the
              custom theme to the application, and as long as the color palette you provide has an overried for the two{' '}
              <Link href="https://developer.microsoft.com/en-us/fabric#/styles/colors">
                <code>Fabric colors</code>
              </Link>{' '}
              used in Shimmer, everything should be ok. If no theming is supported, then follow the example showing the use of the{' '}
              <code>styles</code> prop.
            </p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>
                Use shimmer to help ease a UI transition when we know the service will potentially take a longer amount of time to retrieve
                the data.
              </li>
              <li>
                Provide widths for each of the shimmer elements you used to build a skeleton layout looking as close as possible to real
                content it is replacing.
              </li>
              <li>
                Use <code>isDataLoaded</code> prop to trigger the transition once we have the data from the service. The Shimmer UI should
                Fade out while the real UI Fades In.
              </li>
              <li>Use shimmer if you know the UI loading time is longer than 1 second.</li>
              <li>
                Provide an ETA as quickly as possible to help the user understand that the system isn’t broken if you use shimmer and the
                delay is longer than 10 seconds you must.
              </li>
              <li>Provide shimmer designs for the breakpoints that your experience is supported in.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use on the same element both types of widths. It will always default to just one of them. See documentation below.</li>
              <li>
                Build Shimmer UI should with a lot of details. Circles and rectangles are really as detailed as you want to get. Adding more
                detail will result in confusion once the UI loads.
              </li>
              <li>Use shimmer if you are confident that the UI will take less than a second to load.</li>
              <li>Use shimmer as a way to not make improvements in your code to improve performance.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
