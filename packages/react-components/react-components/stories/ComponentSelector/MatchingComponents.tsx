import * as React from 'react';
import { Divider, Link, Text, makeStyles } from '@fluentui/react-components';

import { getComponentStoryUrl } from './utils';

export const MatchingComponents = ({ components }) => {
  return (
    <>
      <div role="group" aria-labelledby="matching-heading">
        {components.map((component, index) => {
          return (
            <div key={`component-${index}}`}>
              <Text weight="semibold">
                Component name:{' '}
                <Link target="_blank" inline href={getComponentStoryUrl(component)}>
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
