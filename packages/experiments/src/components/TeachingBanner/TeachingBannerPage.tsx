import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { TeachingBannerBasicExample } from './examples/TeachingBanner.Basic.Example';
const TeachingBannerBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/TeachingBanner/examples/TeachingBanner.Basic.Example.tsx') as string;

export class TeachingBannerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="TeachingBanner"
        componentName="TeachingBanner"
        exampleCards={
          <div>
            <ExampleCard title="Folder TeachingBanner" isOptIn={true} code={TeachingBannerBasicExampleCode}>
              <TeachingBannerBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/TeachingBanner/TeachingBanner.types.ts')]}
          />
        }
        overview={
          <div>
            <p>
              Teaching banners are used to educate users about a product. Unlike callouts, banners are used in cases when you can’t point to
              a feature but instead need to educate on a concept or a set of features. These banners are dismissible and can contain call to
              action buttons.
            </p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use to display errors, warning or info messages.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
