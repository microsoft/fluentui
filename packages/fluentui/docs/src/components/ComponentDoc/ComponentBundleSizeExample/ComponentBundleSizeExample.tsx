import * as React from 'react';
import { Accordion, Segment } from 'src/index';
import ComponentExampleTitle from 'docs/src/components/ComponentDoc/ComponentExample/ComponentExampleTitle';
import ComponentExample from 'docs/src/components/ComponentDoc/ComponentExample';
import * as _ from 'lodash';

export interface ComponentBundleSizeExampleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  examplePath: string;
}

const ComponentBundleSizeExample: React.FunctionComponent<ComponentBundleSizeExampleProps> = props => {
  const { title, description } = props;
  return (
    <Segment variables={{ padding: 0 }}>
      <Segment variables={{ boxShadowColor: undefined }}>
        <ComponentExampleTitle title={title} description={description} />
        <div>no data yet</div>
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
                content: <ComponentExample {..._.omit(props, 'title', 'description')} resetTheme />, // resetTheme to make sure the bundle size example contains the theme
              },
            },
          ] as any[]
        }
      />
    </Segment>
  );
};

export default ComponentBundleSizeExample;
