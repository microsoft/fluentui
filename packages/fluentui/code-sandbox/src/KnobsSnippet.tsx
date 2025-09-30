import { CodeSnippet, useKnobValues } from '@fluentui/docs-components';
import { Box, Flex } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

const knobsSnippetStyles = {
  background: 'whitesmoke',
  color: '#777',
  lineHeight: '1.5',
  padding: `5px 10px`,
};

export const KnobsSnippet: React.FC = ({ children }) => {
  const knobs = useKnobValues();
  const values = _.fromPairs(knobs.map(knob => [knob.name, knob.value]));

  return (
    <Flex>
      <Box styles={knobsSnippetStyles}>{children}</Box>
      <Flex.Item grow>
        {({ classes }) => (
          <CodeSnippet
            className={classes}
            copyable={false}
            fitted
            label="Knobs"
            mode="json"
            value={JSON.stringify(values, null, 2)}
          />
        )}
      </Flex.Item>
    </Flex>
  );
};
