import * as React from 'react';

import { ComponentPage, IComponentDemoPageProps, Markdown } from '@fluentui/react-docsite-components';

export class Introduction extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Introduction"
        componentName="Introduction"
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Introduction/docs/Documentation.md')}
          </Markdown>
        }
      />
    );
  }
}
