import * as React from 'react';
import * as _ from 'lodash';

import ComponentExampleTitle from '../ComponentExample/ComponentExampleTitle';

import { Accordion, Flex, Segment, Menu, Loader } from '@fluentui/react-northstar';

import PrototypeExampleControls from './PrototypePerfControls';

const ComponentPerfChart = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "component-chart" */ '../ComponentPerfExample/ComponentPerfChart'))
    .ComponentPerfChart,
}));
const ComponentResourcesChart = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "component-chart" */ '../ComponentPerfExample/ComponentResourcesChart'))
    .ComponentResourcesChart,
}));

export interface PrototypePerfExampleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  examplePath: string;
}

const PrototypePerfExample: React.FC<PrototypePerfExampleProps> = props => {
  const { title, description, examplePath } = props;

  const Prototype = React.lazy(async () => ({
    default: (
      await import(
        /* webpackChunkName: "prototype-example" */ `../../../examples/components/PerformanceTests/${examplePath}`
      )
    ).default,
  }));

  const [renderPrototype, setRenderPrototype] = React.useState(false);
  const [currentChart, setCurrentChart] = React.useState<'perf' | 'resources'>('perf');

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
          onClick={() => {
            setRenderPrototype(true);
          }}
          panels={
            [
              {
                title: {
                  key: 't',
                  content: 'Show prototype',
                  styles: ({ theme }) => {
                    return {
                      fontSize: theme.siteVariables.fontSizes.smaller,
                    };
                  },
                },
                content: {
                  key: 'prototype',
                  content: (
                    <Flex column>
                      <Flex padding="padding.medium" fill hAlign="end">
                        <PrototypeExampleControls examplePath={examplePath} />
                      </Flex>
                      {renderPrototype ? (
                        <React.Suspense fallback={<Loader />}>
                          <Prototype />
                        </React.Suspense>
                      ) : (
                        ''
                      )}
                    </Flex>
                  ),
                },
              },
            ] as any[]
          }
        />
      </Segment>
    </>
  );
};

export default PrototypePerfExample;
