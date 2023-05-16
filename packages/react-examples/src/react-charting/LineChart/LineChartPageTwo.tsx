import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

// import { LineChartBasicExample } from './LineChart.Basic.Example';
// import { LineChartStyledExample } from './LineChart.Styled.Example';
// import { LineChartMultipleExample } from './LineChart.Multiple.Example';
// import { LineChartEventsExample } from './LineChart.Events.Example';
// import { LineChartCustomAccessibilityExample } from './LineChart.CustomAccessibility.Example';
// import { LineChartGapsExample } from './LineChart.Gaps.Example';
// import { LineChartLargeDataExample } from './LineChart.LargeData.Example';
// import { LineChartCustomLocaleDateAxisExample } from './LineChart.CustomLocaleDateAxis.Example';
import { LineChartPerfTwoExample } from './LineChart.PerfAnalysisTwo.Example';
//import { LineChartPerfTwoExample } from './LineChart.PerfAnalysisTwo.Example';

// const LineChartBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Basic.Example.tsx') as string;
// const LineChartStyledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Styled.Example.tsx') as string;
// const MultipleLineChartExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Multiple.Example.tsx') as string;
// const LineChartEventsExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Events.Example.tsx') as string;
// const LineChartCustomAccessibilityExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomAccessibility.Example.tsx') as string;
// const LineChartGapsExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.Gaps.Example.tsx') as string;
// const LineChartLargeDataExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.LargeData.Example.tsx') as string;
// const LineChartCustomLocaleDateAxisExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.CustomLocaleDateAxis.Example.tsx') as string;
const LineChartPerfAnalysisTwoExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.PerfAnalysisTwo.Example.tsx') as string;
//const LineChartPerfAnalysisTwoExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/LineChart/LineChart.PerfAnalysisTwo.Example.tsx') as string;

// All line charts locale is impacted.

export class LineChartPageTwo extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Line Chart Page Two"
        componentName="LineChartPerfTwoExample"
        exampleCards={
          <div>
            {/* <ExampleCard title="LineChart basic" code={LineChartBasicExampleCode}>
              <LineChartBasicExample />
            </ExampleCard>
            <ExampleCard title="LineChart styled" code={LineChartStyledExampleCode}>
              <LineChartStyledExample />
            </ExampleCard>
            <ExampleCard title="Multiple Line chart" code={MultipleLineChartExampleCode}>
              <LineChartMultipleExample />
            </ExampleCard>
            <ExampleCard title="LineChart with events" code={LineChartEventsExampleCode}>
              <LineChartEventsExample />
            </ExampleCard>
            <ExampleCard title="LineChart Custom Accessibility" code={LineChartCustomAccessibilityExampleCode}>
              <LineChartCustomAccessibilityExample />
            </ExampleCard>
            <ExampleCard title="LineChart with gaps" code={LineChartGapsExampleCode}>
              <LineChartGapsExample />
            </ExampleCard>
            <ExampleCard title="LineChart large data" code={LineChartLargeDataExampleCode}>
              <LineChartLargeDataExample />
            </ExampleCard>
            <ExampleCard title="LineChart custom date axis locale" code={LineChartCustomLocaleDateAxisExampleCode}>
              <LineChartCustomLocaleDateAxisExample />
            </ExampleCard> */}
            <ExampleCard title="LineChart custom Perf Data " code={LineChartPerfAnalysisTwoExampleCode}>
              <LineChartPerfTwoExample />
            </ExampleCard>
            {/* <ExampleCard title="LineChart custom Perf Two Data " code={LineChartPerfAnalysisTwoExampleCode}>
              <LineChartPerfTwoExample />
            </ExampleCard> */}
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/LineChart/LineChart.types.ts'),
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/CommonComponents/CartesianChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <div>
            <p>
              Use a line graph to visualize data sets over a period of time for an individual or group of items. The
              amount of lines (data sets) depend on the attributes selected during the report creation.
            </p>
            <p>The line graph thickness will vary depending on the number of data sets and data increments.</p>

            <h3>Variant details</h3>
            <h4>Event annotations</h4>
            <p>
              Event annotations are used to highlight events and annotate them using messages. Annotations are
              represented by vertical line markers to mark the date and callouts to represent the message. Events can be
              added by using <code>eventAnnotationProps</code> prop. Each event contains a
              <code>date, event message</code> and event details callout callback
              <code>onRenderCard</code>
            </p>
            <h4>Gaps</h4>
            <p>
              A line chart can have gaps/breaks in between. This is to represent missing data. The gaps can also be
              replaced with dashed or dotted lines for specific scenarios, say to represent low confidence predictions
              for a time series forecast graph. Gaps can be added by using <code>gaps</code> prop. A gap is denoted by
              <code>startIndex</code> and
              <code>endIndex</code> datapoints in the line. A line will be drawn uptil the startIndex and skipped for
              <code>endIndex - startIndex</code> number of datapoints. A line can have as many gaps as possible.
            </p>
            <h4>Line border</h4>
            <p>
              Each line in the chart can contain a 2 px border for better highlighting of the line when there are
              multiple items in the chart. The border will have color of the background theme. Lines will be highlighted
              in order of their appearance in legends. Line border is a highly suggested style that you should apply to
              make multiple lines more distinguishable from each other. Use <code>lineBorderWidth</code> prop present
              inside
              <code>lineOptions</code> to enable it.
            </p>
            <h4>Lines with large dataset</h4>
            <p>
              We use a path based rendering technique to show datasets with large number of points (greater than 1k).
              Using this technique datasets with over 10k points can be rendered easily. Enable this rendering method by
              setting the <code>optimizeLargeData</code> prop to <code>true</code>.
            </p>
            <h4>Custom accessibility</h4>
            <p>
              Line chart provides a bunch of props to enable custom accessibility messages. Use
              <code>xAxisCalloutAccessibilityData</code>
              and <code>callOutAccessibilityData</code> to configure x axis and y axis accessibility messages
              respectively.
            </p>
            <h4>Date Axis localization</h4>
            <p>
              The axes support 2 ways of localization. <br />
              1. Javascript provided inbuilt localization for numeric and date axis. Specify the culture and
              dateLocalizeOptions for date axis to define target localization. Refer the
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString">
                Javascript localization guide
              </a>
              for usage. <br />
              2. Custom locale definition: The consumer of the library can specify a custom locale definition as
              supported by d3 <a href="https://github.com/d3/d3-time-format/blob/main/locale/en-US.json">like this</a>.
              The date axis will use the date range and the multiformat specified in the definition to determine the
              correct labels to show in the ticks. For example - If the date range is in days then the axis will show
              hourly ticks. If the date range spans across months then the axis will show months in tick labels and so
              on. Specify the custom locale definition in the <code>timeFormatLocale</code> prop. Refer to the Custom
              Locale Date Axis example in line chart for sample usage.
            </p>
          </div>
        }
      />
    );
  }
}
