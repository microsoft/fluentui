import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { ArrowUpRegular, ArrowEnterUpRegular } from '@fluentui/react-icons';

export const Positioning = () => {
  /* eslint-disable react/jsx-key */
  const positions = [
    ['above-start', <ArrowEnterUpRegular />],
    ['above', <ArrowUpRegular />],
    ['above-end', <ArrowEnterUpRegular transform="scale(-1 1)" />],

    ['before-top', <ArrowEnterUpRegular transform="rotate(-90) scale(-1 1)" />],
    ['before', <ArrowUpRegular transform="rotate(-90)" />],
    ['before-bottom', <ArrowEnterUpRegular transform="rotate(-90)" />],

    ['after-top', <ArrowEnterUpRegular transform="rotate(90)" />],
    ['after', <ArrowUpRegular transform="rotate(90)" />],
    ['after-bottom', <ArrowEnterUpRegular transform="rotate(90) scale(-1 1)" />],

    ['below-start', <ArrowEnterUpRegular transform="rotate(180) scale(-1 1)" />],
    ['below', <ArrowUpRegular transform="rotate(180)" />],
    ['below-end', <ArrowEnterUpRegular transform="rotate(180)" />],
  ] as const;

  return (
    <div
      style={{
        display: 'grid',
        margin: '24px 128px',
        gap: '4px',
        gridTemplateAreas:
          '".             above-start   above         above-end     .            "' +
          '"before-top    .             .             .             after-top    "' +
          '"before        .             .             .             after        "' +
          '"before-bottom .             .             .             after-bottom "' +
          '".             below-start   below         below-end     .            "',
      }}
    >
      {positions.map(([position, icon]) => (
        <Tooltip withArrow positioning={position} content={position} relationship="label">
          <Button icon={icon} style={{ gridArea: position, minWidth: '64px', height: '64px' }} />
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
