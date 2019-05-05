import { IDemoPageProps } from './DemoPage.types';
import {
  ComponentPage,
  ExampleCard,
  ApiReferencesTableSet,
  PropertiesTableSet,
  PageMarkdown,
  FeedbackList,
  Highlight
} from '@uifabric/example-app-base';
import * as React from 'react';

export const DemoPage: React.StatelessComponent<IDemoPageProps> = demoPageProps => {
  const {
    implementationExamples,
    exampleKnobs,
    examples,
    propertiesTablesSources,
    overview,
    bestPractices,
    dos,
    donts,
    // This is unused but has to be pulled out because ComponentPage has a prop with the same name and different type
    componentStatus,
    // Passing the extra props to ComponentPage like this helps to keep the prop names in sync
    ...componentPageProps
  } = demoPageProps;
  return (
    <ComponentPage
      {...componentPageProps}
      implementationExampleCards={
        implementationExamples && (
          <div>
            {implementationExamples.map(example => (
              <ExampleCard title={example.title} code={example.code} key={example.title} codeHighlighter={Highlight}>
                {example.view}
              </ExampleCard>
            ))}
          </div>
        )
      }
      exampleCards={
        (exampleKnobs || examples) && (
          <div>
            {exampleKnobs}
            {examples &&
              examples.map(example => {
                const { view, ...cardProps } = example;
                return (
                  <ExampleCard key={cardProps.title} {...cardProps}>
                    {view}
                  </ExampleCard>
                );
              })}
          </div>
        )
      }
      propertiesTables={
        (componentPageProps.jsonDocs && <ApiReferencesTableSet jsonDocs={componentPageProps.jsonDocs} />) ||
        (propertiesTablesSources && <PropertiesTableSet sources={propertiesTablesSources} />)
      }
      overview={overview ? <PageMarkdown>{overview}</PageMarkdown> : undefined}
      bestPractices={bestPractices ? <PageMarkdown>{bestPractices}</PageMarkdown> : undefined}
      dos={dos ? <PageMarkdown>{dos}</PageMarkdown> : undefined}
      donts={donts ? <PageMarkdown>{donts}</PageMarkdown> : undefined}
      feedback={componentPageProps.isFeedbackVisible ? <FeedbackList title={componentPageProps.title} /> : undefined}
    />
  );
};
