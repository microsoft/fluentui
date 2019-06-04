import { IDemoPageProps } from './DemoPage.types';
import { ComponentPage, ExampleCard, ApiReferencesTableSet, PropertiesTableSet, Markdown, FeedbackList } from '@uifabric/example-app-base';
import * as React from 'react';

export const DemoPage: React.StatelessComponent<IDemoPageProps> = demoPageProps => {
  const {
    exampleKnobs,
    examples,
    propertiesTablesSources,
    overview,
    bestPractices,
    dos,
    donts,
    // Passing the extra props to ComponentPage like this helps to keep the prop names in sync
    ...componentPageProps
  } = demoPageProps;
  return (
    <ComponentPage
      {...componentPageProps}
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
      overview={overview ? <Markdown>{overview}</Markdown> : undefined}
      bestPractices={bestPractices ? <Markdown>{bestPractices}</Markdown> : undefined}
      dos={dos ? <Markdown>{dos}</Markdown> : undefined}
      donts={donts ? <Markdown>{donts}</Markdown> : undefined}
      feedback={componentPageProps.isFeedbackVisible ? <FeedbackList title={componentPageProps.title} /> : undefined}
    />
  );
};
