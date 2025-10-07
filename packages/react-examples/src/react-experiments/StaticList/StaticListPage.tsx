import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@fluentui/react-docsite-components';
import type { JSXElement } from '@fluentui/utilities';

export class StaticListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSXElement {
    return (
      <ComponentPage
        title="StaticList"
        componentName="StaticList"
        exampleCards={<div />}
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/StaticList/StaticList.types.ts'),
            ]}
          />
        }
        dos={
          <div>
            <ul>
              <li>Use to render a list of items.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul />
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
