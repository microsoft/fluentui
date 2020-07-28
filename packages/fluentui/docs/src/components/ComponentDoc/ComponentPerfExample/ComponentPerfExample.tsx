import * as React from 'react';
import * as _ from 'lodash';

import ComponentExampleTitle from '../ComponentExample/ComponentExampleTitle';
import { Accordion, Flex, Segment, Menu, Loader } from '@fluentui/react-northstar';
import ComponentExample from '../ComponentExample';

const ComponentPerfChart = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "component-chart" */ './ComponentPerfChart')).ComponentPerfChart,
}));
const ComponentResourcesChart = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "component-chart" */ './ComponentResourcesChart'))
    .ComponentResourcesChart,
}));

export interface ComponentPerfExampleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  examplePath: string;
}

const ComponentPerfExample: React.FC<ComponentPerfExampleProps> = props => {
  const { title, description, examplePath } = props;

  const [currentChart, setCurrentChart] = React.useState<'perf' | 'resources'>('perf');

  // "components/Divider/Performance/Divider.perf" -> dividerPerfTsx
  const perfTestName = `${_.camelCase(_.last(examplePath.split('/')))}Tsx`;

  return (
    <>
      <Segment variables={{ padding: 0 }}>
        <Segment variables={{ boxShadowColor: undefined }}>
          <Flex space="between" style={{ padding: '10px 20px' }}>
            <ComponentExampleTitle title={title} description={description} />
            <Menu
              primary
              items={[
                {
                  content: 'Performance',
                  key: 'performance',
                  active: currentChart === 'perf',
                  onClick: () => setCurrentChart('perf'),
                },
                {
                  content: 'Resources',
                  key: 'resources',
                  active: currentChart === 'resources',
                  onClick: () => setCurrentChart('resources'),
                },
              ]}
            />
          </Flex>
          <React.Suspense fallback={<Loader />}>
            {currentChart === 'perf' ? (
              <ComponentPerfChart perfTestName={perfTestName} />
            ) : (
              <ComponentResourcesChart perfTestName={perfTestName} />
            )}
          </React.Suspense>
        </Segment>
        <Accordion
          panels={
            [
              {
                title: {
                  key: 't',
                  content: 'Show example',
                  styles: ({ theme }) => {
                    return {
                      fontSize: theme.siteVariables.fontSizes.smaller,
                    };
                  },
                },
                content: {
                  key: 'c',
                  content: <ComponentExample titleForAriaLabel={title} {..._.omit(props, 'title', 'description')} />, // FIXME: defer rendering until opened
                },
              },
            ] as any[]
          }
        />
      </Segment>
    </>
  );
};

export default ComponentPerfExample;
