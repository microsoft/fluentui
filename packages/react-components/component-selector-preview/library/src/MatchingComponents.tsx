import * as React from 'react';
import { Divider, Link, Text } from '@fluentui/react-components';

import { ComponentDefinition } from './ComponentSelector';
import { getComponentStoryUrl } from './utils';

interface MatchingComponentsProps {
  components: ComponentDefinition[];
}

export const MatchingComponents: React.FC<MatchingComponentsProps> = ({ components }) => {
  return (
    <>
      <div role="group" aria-labelledby="matching-heading">
        {components.map((component, index) => {
          return (
            <div key={`component-${index}}`}>
              <Text weight="semibold">
                Component name:{' '}
                <Link target="_blank" inline href={component.link ?? getComponentStoryUrl(component)}>
                  {component.component}{' '}
                </Link>
              </Text>
              <br />
              <Text weight="semibold">Example:</Text> {component.story ? component.story : 'Default'}
              {component.note && (
                <div>
                  <Text weight="semibold">Note:</Text> <Text>{component.note}</Text>
                </div>
              )}
              <Divider appearance="strong" />
            </div>
          );
        })}
      </div>
    </>
  );
};
