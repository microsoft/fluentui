import { IDemoPageProps } from './DemoPage.types';
import {
  ComponentPage,
  ExampleCard,
  ApiReferencesTableSet,
  PropertiesTableSet,
  Markdown,
  FeedbackList,
  IExampleCardProps,
} from '@fluentui/react-docsite-components';
import * as React from 'react';

export const DemoPage: React.FunctionComponent<IDemoPageProps> = demoPageProps => {
  const {
    exampleKnobs,
    examples,
    propertiesTablesSources,
    overview,
    bestPractices,
    dos,
    donts,
    accessibility,
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
                const { view, styles, ...cardProps } = example;
                return (
                  <ExampleCard key={cardProps.title} styles={styles as IExampleCardProps['styles']} {...cardProps}>
                    {view}
                  </ExampleCard>
                );
              })}
          </div>
        )
      }
      propertiesTables={
        (componentPageProps.jsonDocs && (
          <ApiReferencesTableSet
            jsonDocs={componentPageProps.jsonDocs}
            showAll={componentPageProps.jsonDocs.group === 'References'}
          />
        )) ||
        (propertiesTablesSources && <PropertiesTableSet sources={propertiesTablesSources} />)
      }
      accessibility={accessibility ? <Markdown>{accessibility}</Markdown> : undefined}
      overview={overview ? <Markdown>{overview}</Markdown> : undefined}
      bestPractices={bestPractices ? <Markdown>{bestPractices}</Markdown> : undefined}
      dos={dos ? <Markdown>{dos}</Markdown> : undefined}
      donts={donts ? <Markdown>{donts}</Markdown> : undefined}
      feedback={componentPageProps.isFeedbackVisible ? <FeedbackList title={componentPageProps.title} /> : undefined}
    />
  );
};
