import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage } from '@uifabric/example-app-base';
import {
  RecommendationBasicExample,
  RecommendationDlpExample,
  RecommendationPasswordSettingsExample
} from './examples';
const RecommendationExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Recommendation/examples/Recommendation.Basic.Example.tsx') as string;

const DlpRecommendationCode = require('!raw-loader!@uifabric/experiments/src/components/Recommendation/examples/Recommendation.DLP.Example.tsx') as string;

const PasswordSettingsRecommendationCode = require('!raw-loader!@uifabric/experiments/src/components/Recommendation/examples/Recommendation.PasswordSettings.Example.tsx') as string;

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
            <ExampleCard title="DLP Recommendation Card (Data Visualization Example)" code={DlpRecommendationCode}>
              <RecommendationDlpExample />
            </ExampleCard>
            <ExampleCard
              title="Password Settings Recommendation Card (Image Illustration Example)"
              code={PasswordSettingsRecommendationCode}
            >
              <RecommendationPasswordSettingsExample />
            </ExampleCard>
          </div>
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Do's</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Dont's</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
