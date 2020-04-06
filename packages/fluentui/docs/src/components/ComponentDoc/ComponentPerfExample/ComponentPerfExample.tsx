import * as React from 'react';
import * as _ from 'lodash';

import ComponentExampleTitle from '../ComponentExample/ComponentExampleTitle';
import { Accordion, Segment } from '@fluentui/react-northstar';
import ComponentExample from '../ComponentExample';
import { ComponentPerfChart } from './ComponentPerfChart';

export interface ComponentPerfExampleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  examplePath: string;
}

const ComponentPerfExample: React.FC<ComponentPerfExampleProps> = props => {
  const { title, description, examplePath } = props;
  // FIXME: find a better way
  // "components/Divider/Performance/Divider.perf" -> dividerPerfTsx
  const perfTestName = `${_.camelCase(_.last(examplePath.split('/')))}Tsx`;

  return (
    <>
      <Segment variables={{ padding: 0 }}>
        <Segment variables={{ boxShadowColor: undefined }}>
          <ComponentExampleTitle title={title} description={description} />
          <ComponentPerfChart perfTestName={perfTestName} />
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
                  content: <ComponentExample {..._.omit(props, 'title', 'description')} />, // FIXME: defer rendering until opened
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
