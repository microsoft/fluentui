import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet,
  PageMarkdown
} from '@uifabric/example-app-base';
import { ShimmerBasicExample } from './examples/Shimmer.Basic.Example';
import { ShimmerCustomElementsExample } from './examples/Shimmer.CustomElements.Example';
import { ShimmerLoadDataExample } from './examples/Shimmer.LoadData.Example';
import { ShimmerApplicationExample } from './examples/Shimmer.Application.Example';
import { ShimmerStylingExample } from './examples/Shimmer.Styling.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ShimmerStatus } from './Shimmer.checklist';

const ShimmerBasicExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Basic.Example.tsx'
) as string;

const ShimmerCustomExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.CustomElements.Example.tsx'
) as string;

const ShimmerStylingExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Styling.Example.tsx'
) as string;

const ShimmerLoadDataExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.LoadData.Example.tsx'
) as string;

const ShimmerApplicationExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx'
) as string;

export class ShimmerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Shimmer'
        componentName='ShimmerExample'
        componentUrl='https://githubcom/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Shimmer'
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
              title='Style override of shimmering wave using "styles" prop'
              code={ ShimmerStylingExampleCode }
            >
              <ShimmerStylingExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Shimmer/Shimmer.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Shimmer/docs/ShimmerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Shimmer/docs/ShimmerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Shimmer/docs/ShimmerDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ShimmerStatus }
          />
        }
      />
    );
  }
}
