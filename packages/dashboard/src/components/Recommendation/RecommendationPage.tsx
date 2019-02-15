import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import {
  RecommendationBasicExample,
  RecommendationAutoFontExample,
  RecommendationCustomDataVizExample,
  RecommendationPasswordSettingsExample,
  RecommendationMultiStackedBarChartExample,
  RecommendationStackedBarChartExample
} from './examples/index';
const RecommendationExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Recommendation/examples/Recommendation.Basic.Example.tsx') as string;
const RecommendationAutoFontExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Recommendation/examples/Recommendation.AutoFont.Example.tsx') as string;
const DlpRecommendationCode = require('!raw-loader!@uifabric/dashboard/src/components/Recommendation/examples/Recommendation.CustomDataViz.Example.tsx') as string;
const DlpMultiStackedBarChartCode = require('!raw-loader!@uifabric/dashboard/src/components/Recommendation/examples/Recommendation.MultiStackedBarChart.Example.tsx') as string;
const DlpStackedBarChartCode = require('!raw-loader!@uifabric/dashboard/src/components/Recommendation/examples/Recommendation.StackedBarChart.Example.tsx') as string;
const PasswordSettingsRecommendationCode = require('!raw-loader!@uifabric/dashboard/src/components/Recommendation/examples/Recommendation.PasswordSettings.Example.tsx') as string;

export class RecommendationPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Recommendation"
        componentName="Recommendation"
        exampleCards={
          <div>
            <ExampleCard title="Basic Recommendation Card" code={RecommendationExampleCode}>
              <RecommendationBasicExample />
            </ExampleCard>
            <ExampleCard title="AutoFont Adjusting Recommendation Card" code={RecommendationAutoFontExampleCode}>
              <RecommendationAutoFontExample />
            </ExampleCard>
            <ExampleCard title="Custom DataViz Recommendation Card" code={DlpRecommendationCode}>
              <RecommendationCustomDataVizExample />
            </ExampleCard>
            <ExampleCard title="DLP Recommendation Card (MultiStackedBarChart Example)" code={DlpMultiStackedBarChartCode}>
              <RecommendationMultiStackedBarChartExample />
            </ExampleCard>
            <ExampleCard title="MIP Recommendation Card (StackedBarChart Example)" code={DlpStackedBarChartCode}>
              <RecommendationStackedBarChartExample />
            </ExampleCard>
            <ExampleCard
              title="Password Settings Recommendation Card (Image Illustration Example)"
              code={PasswordSettingsRecommendationCode}
            >
              <RecommendationPasswordSettingsExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/Recommendation/Recommendation.types.ts')]}
          />
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>The recommendation control allows you to recommend an action to an admin with and without a data visualization.</p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use for features where activation can occur in a few steps in the context of M365 dashboard.</li>
              <li>Provide a concise benefit headline that speaks to the product value of the feature.</li>
              <li>
                Keep description text brief and consider how localization may affect the message. Translation to other languages may add up
                to 33% more characters to the string length.
              </li>
              <li>Include a single data visualization only when it makes comprehension of the feature more efficient.</li>
              <li>Include a single CTA (“view recommendation”).</li>
              <li>Offer a corresponding report card (if applicable) on the dashboard after activation.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Make the admin leave the dashboard to activate the feature.</li>
              <li>Include multiple calls to action on the recommendation card.</li>
              <li>Include multiple data visualizations.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
