import { IDemoPageProps } from './DemoPage.types';
import { ComponentPage, ExampleCard, PropertiesTableSet, PageMarkdown } from '@uifabric/example-app-base';
import * as React from 'react';
import { ComponentStatus } from '../ComponentStatus/ComponentStatus';

export const DemoPage: React.StatelessComponent<IDemoPageProps> = componentPageProps => {
  return (
    <ComponentPage
      title={componentPageProps.title}
      componentName={componentPageProps.componentName}
      componentUrl={componentPageProps.componentUrl}
      exampleCards={
        <div>
          {componentPageProps.examples.map(example => (
            <ExampleCard title={example.title} code={example.code} key={example.title}>
              {example.view}
            </ExampleCard>
          ))}
        </div>
      }
      propertiesTables={<PropertiesTableSet sources={componentPageProps.propertiesTablesSources} />}
      overview={<PageMarkdown>{componentPageProps.overview}</PageMarkdown>}
      bestPractices={<PageMarkdown>{componentPageProps.bestPractices}</PageMarkdown>}
      dos={<PageMarkdown>{componentPageProps.dos}</PageMarkdown>}
      donts={<PageMarkdown>{componentPageProps.donts}</PageMarkdown>}
      isHeaderVisible={componentPageProps.isHeaderVisible}
      componentStatus={<ComponentStatus {...componentPageProps.componentStatus} />}
    />
  );
};
