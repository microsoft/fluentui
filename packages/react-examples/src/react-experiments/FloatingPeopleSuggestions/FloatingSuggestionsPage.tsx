import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { FloatingPeopleSuggestionsExample } from './FloatingPeopleSuggestions.Example';
const FloatingPeoplePickerSuggestionsExampleCode = require('!raw-loader!./FloatingPeopleSuggestions.Example') as string;
import { FloatingPeopleSuggestionsCustomRenderExample } from './FloatingPeopleSuggestions.CustomRender.Example';
const FloatingPeoplePickerSuggestionsCustomRenderCode = require('!raw-loader!./FloatingPeopleSuggestions.CustomRender.Example') as string;

export class FloatingSuggestionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="FloatingPeopleSuggestions"
        componentName="FloatingPeopleSuggestions"
        exampleCards={
          <div>
            <ExampleCard title="Basic" isOptIn={true} code={FloatingPeoplePickerSuggestionsExampleCode}>
              <FloatingPeopleSuggestionsExample />
            </ExampleCard>
            <ExampleCard title="Custom rendering" isOptIn={true} code={FloatingPeoplePickerSuggestionsCustomRenderCode}>
              <FloatingPeopleSuggestionsCustomRenderExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require('!raw-loader!@fluentui/react-experiments/src/components/FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions.types.ts') as string,
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
