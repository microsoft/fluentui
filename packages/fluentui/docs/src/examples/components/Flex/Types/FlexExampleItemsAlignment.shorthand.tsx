import * as React from 'react';
import { Flex, Segment } from '@fluentui/react-northstar';

const FlexExampleItemsAlignment = () => (
  <Flex column gap="gap.large" hAlign="center" vAlign="center" debug>
    {[
      {
        key: 'start',
        items: [
          { hAlign: 'start', vAlign: 'start' },
          { hAlign: 'start', vAlign: 'center' },
          { hAlign: 'start', vAlign: 'end' },
        ],
      },
      {
        key: 'center',
        items: [
          { hAlign: 'center', vAlign: 'start' },
          { hAlign: 'center', vAlign: 'center' },
          { hAlign: 'center', vAlign: 'end' },
        ],
      },
      {
        key: 'end',
        items: [
          { hAlign: 'end', vAlign: 'start' },
          { hAlign: 'end', vAlign: 'center' },
          { hAlign: 'end', vAlign: 'end' },
        ],
      },
    ].map(rowOfAlignmentProps => (
      <Flex gap="gap.large" key={rowOfAlignmentProps.key}>
        {rowOfAlignmentProps.items.map((alignmentProps: any) => (
          <Flex
            inline
            {...alignmentProps}
            key={alignmentProps.vAlign}
            style={{ width: '100px', height: '100px' }}
            debug
          >
            <Segment styles={{ width: '30px', height: '30px' }} />
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
);

export default FlexExampleItemsAlignment;
