import { IDemoPageProps } from './DemoPage.types';
import { ComponentPage, ExampleCard, PropertiesTableSet, PageMarkdown, FeedbackList } from '@uifabric/example-app-base';
import * as React from 'react';
import { ComponentStatus } from '../ComponentStatus/ComponentStatus';

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
              <ExampleCard title={example.title} code={example.code} key={example.title}>
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
      propertiesTables={componentPageProps.jsonDocs && <PropertiesTableSet jsonDocs={componentPageProps.jsonDocs} />}
      overview={overview ? <PageMarkdown>{overview}</PageMarkdown> : undefined}
      bestPractices={bestPractices ? <PageMarkdown>{bestPractices}</PageMarkdown> : undefined}
      dos={dos ? <PageMarkdown>{dos}</PageMarkdown> : undefined}
      donts={donts ? <PageMarkdown>{donts}</PageMarkdown> : undefined}
      componentStatus={componentStatus ? <ComponentStatus {...componentStatus} /> : undefined}
      feedback={componentPageProps.isFeedbackVisible ? <FeedbackList title={componentPageProps.title} /> : undefined}
    />
  );
};
