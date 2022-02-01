import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { tokens } from '@fluentui/react-theme';
import { InfoRegular } from '@fluentui/react-icons';

export const Target = () => {
  const [targetContainer, setTargetContainer] = React.useState<HTMLDivElement | null>(null);
  const [targetIcon, setTargetIcon] = React.useState<HTMLSpanElement | null>(null);
  return (
    <div
      ref={setTargetContainer}
      style={{
        display: 'flex',
        gap: '10px',
        padding: '10px',
        border: `1px solid ${tokens.colorPaletteCharcoalBorder1}`,
        background: tokens.colorPaletteCharcoalBackground1,
      }}
    >
      <Tooltip
        positioning={{ target: targetContainer }}
        content="This tooltip targets the container"
        relationship="description"
      >
        <Button>Container</Button>
      </Tooltip>
      <Tooltip
        withArrow
        positioning={{ target: targetIcon }}
        content="This tooltip points to the icon"
        relationship="description"
      >
        <Button icon={{ ref: setTargetIcon, children: <InfoRegular /> }}>Icon</Button>
      </Tooltip>
    </div>
  );
};

Target.parameters = {
  docs: {
    description: {
      story:
        'Use the `target` attribute of the `positioning` prop to place the tooltip ' +
        'relative to an element other than its trigger.',
    },
  },
};
