import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { FloatingPeopleSuggestionsExample } from './examples/FloatingPeopleSuggestions.Example';
const FloatingPeoplePickerSuggestionsExampleCode = require('!raw-loader!./examples/FloatingPeopleSuggestions.Example') as string;
import { FloatingPeopleSuggestionsCustomRenderExample } from './examples/FloatingPeopleSuggestions.CustomRender.Example';
const FloatingPeoplePickerSuggestionsCustomRenderCode = require('!raw-loader!./examples/FloatingPeopleSuggestions.CustomRender.Example') as string;

export class FloatingSuggestionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="FloatingSuggestions"
        componentName="FloatingSuggestions"
        exampleCards={
          <div>
            <ExampleCard title="Basic" isOptIn={true} code={FloatingPeoplePickerSuggestionsExampleCode}>
              <FloatingPeopleSuggestionsExample />
            </ExampleCard>
            <ExampleCard title="Basic" isOptIn={true} code={FloatingPeoplePickerSuggestionsCustomRenderCode}>
              <FloatingPeopleSuggestionsCustomRenderExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require('!raw-loader!@uifabric/experiments/src/components/FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions.types.ts') as string,
            ]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use them to display a list of people suggestions</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them to display things that aren't people suggestions</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
