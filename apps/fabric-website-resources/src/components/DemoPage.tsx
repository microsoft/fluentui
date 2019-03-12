import { IDemoPageProps } from './DemoPage.types';
import { ComponentPage, ExampleCard, PropertiesTableSet, PageMarkdown, FeedbackList } from '@uifabric/example-app-base';
import * as React from 'react';
import { ComponentStatus } from '../ComponentStatus/ComponentStatus';

export const DemoPage: React.StatelessComponent<IDemoPageProps> = componentPageProps => {
  return (
    <ComponentPage
      title={componentPageProps.title}
      componentName={componentPageProps.componentName}
      componentUrl={componentPageProps.componentUrl}
      implementationExampleCards={
        componentPageProps.implementationExamples ? (
          <div>
            {componentPageProps.implementationExamples.map(example => (
              <ExampleCard title={example.title} code={example.code} key={example.title}>
                {example.view}
              </ExampleCard>
            ))}
          </div>
        ) : (
          undefined
        )
      }
      related={componentPageProps.related || undefined}
      exampleCards={
        componentPageProps.exampleKnobs || componentPageProps.examples ? (
          <div>
            {componentPageProps.exampleKnobs}
            {componentPageProps.examples &&
              componentPageProps.examples.map(example => (
                <ExampleCard
                  title={example.title}
                  code={example.code}
                  key={example.title}
                  codepenJS={example.codepenJS}
                  isScrollable={example.isScrollable}
                >
                  {example.view}
                </ExampleCard>
              ))}
          </div>
        ) : (
          undefined
        )
      }
      propertiesTables={
        componentPageProps.propertiesTablesSources && <PropertiesTableSet sources={componentPageProps.propertiesTablesSources} />
      }
      overview={componentPageProps.overview ? <PageMarkdown>{componentPageProps.overview}</PageMarkdown> : undefined}
      bestPractices={componentPageProps.bestPractices ? <PageMarkdown>{componentPageProps.bestPractices}</PageMarkdown> : undefined}
      dos={componentPageProps.dos ? <PageMarkdown>{componentPageProps.dos}</PageMarkdown> : undefined}
      donts={componentPageProps.donts ? <PageMarkdown>{componentPageProps.donts}</PageMarkdown> : undefined}
      isHeaderVisible={componentPageProps.isHeaderVisible}
      componentStatus={componentPageProps.componentStatus ? <ComponentStatus {...componentPageProps.componentStatus} /> : undefined}
      isFeedbackVisible={componentPageProps.isFeedbackVisible}
      feedback={componentPageProps.isFeedbackVisible ? <FeedbackList title={componentPageProps.title} /> : undefined}
    />
  );
};
