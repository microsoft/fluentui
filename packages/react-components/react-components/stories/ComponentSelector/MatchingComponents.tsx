import * as React from 'react';
import { Divider, Link, Text, makeStyles } from '@fluentui/react-components';

import { getComponentStoryUrl } from './utils';

const useStyles = makeStyles({
  heading: { margin: '30px 0 10px 0' },
  foundMessage: { 'margin-bottom': '10px' },
});

export const MatchingComponents = ({ components }) => {
  const classes = useStyles();

  return (
    <>
      <h2 id="matching-heading" className={classes.heading}>
        Matching components
      </h2>
      <div role="group" aria-labelledby="matching-heading">
        <div className={classes.foundMessage}>
          <Text as="h3" weight="bold">
            {/* Found {foundComponents.length} component(s).{' '} */}
          </Text>
        </div>
        {components.map((component, index) => {
          return (
            <div key={`component-${index}}`}>
              <Text weight="semibold">
                Component name:{' '}
                <Link target="_blank" inline href={getComponentStoryUrl(component)}>
                  {component.name}{' '}
                </Link>
              </Text>
              <br />
              <Text weight="semibold">Example:</Text> {component.exampleName ? component.exampleName : 'Default'}
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
