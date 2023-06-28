import * as React from 'react';

import {
  //   ComponentPage,
  //   ExampleCard,
  IComponentDemoPageProps,
  //   PropertiesTableSet
} from '@fluentui/react-docsite-components';

import { LineChartBasicExample } from './LineChart.Basic.Example';

// All line charts locale is impacted.

export class LineChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <>
        <h1>Line chart</h1>
        <div>
          <LineChartBasicExample />
        </div>
      </>
    );
  }
}
