import * as React from 'react';
import * as _ from 'lodash';

import { Accordion, Segment } from '@fluentui/react-northstar';
import ComponentExampleTitle from '../ComponentExample/ComponentExampleTitle';
import ComponentExample from '../ComponentExample';
import { ComponentBundleSizeChart } from './ComponentBundleSizeChart';

export interface ComponentBundleSizeExampleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  examplePath: string;
}

const ComponentBundleSizeExample: React.FunctionComponent<ComponentBundleSizeExampleProps> = props => {
  const { title, description, examplePath } = props;
  // "components/Divider/Performance/Divider.bsize" -> dividerBSizeTsxJs
  const perfTestName = `${_.camelCase(_.last(examplePath.split('/')))}TsxJs`;
  return (
    <Segment variables={{ padding: 0 }}>
      <Segment variables={{ boxShadowColor: undefined }}>
        <ComponentExampleTitle title={title} description={description} />
        <ComponentBundleSizeChart bundleSizeTestName={perfTestName} />
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
                content: <ComponentExample examplePath={examplePath} resetTheme />, // resetTheme to make sure the bundle size example contains the theme
              },
            },
          ] as any[]
        }
      />
    </Segment>
  );
};

export default ComponentBundleSizeExample;
