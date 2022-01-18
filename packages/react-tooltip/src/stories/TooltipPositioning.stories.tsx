import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';

export const Positioning = () => {
  const positions = [
    'above-start',
    'above',
    'above-end',
    'before-top',
    'before',
    'before-bottom',
    'after-top',
    'after',
    'after-bottom',
    'below-start',
    'below',
    'below-end',
  ] as const;

  return (
    <div
      style={{
        display: 'grid',
        gap: '4px',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateAreas:
          '".             above-start   above         above-end     .            "' +
          '"before-top    .             .             .             after-top    "' +
          '"before        .             .             .             after        "' +
          '"before-bottom .             .             .             after-bottom "' +
          '".             below-start   below         below-end     .            "',
      }}
    >
      {positions.map(position => (
        <Tooltip withArrow key={position} positioning={position} content={position}>
          <Button size="small" style={{ gridArea: position, height: '40px', minWidth: '40px' }} />
        </Tooltip>
      ))}
    </div>
  );
};

Positioning.parameters = {
  docs: {
    description: {
      story: 'The positioning attribute can be used to change the relative placement of the tooltip to its anchor.',
    },
  },
};
