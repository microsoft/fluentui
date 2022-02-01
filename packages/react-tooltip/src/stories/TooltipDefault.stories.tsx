import * as React from 'react';

import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { InfoRegular } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';

export const Default = () => (
  <Tooltip content="This is an example" relationship="description">
    <Button>Button with a tooltip</Button>
  </Tooltip>
);

Default.parameters = {
  docs: {
    description: {
      story: 'By default, Tooltip appears above its target element, when it is focused or hovered.',
    },
  },
};

export const Inverted = () => (
  <Tooltip appearance="inverted" content="This has an inverted appearance" relationship="description">
    <Button>Inverted appearance</Button>
  </Tooltip>
);

Inverted.parameters = {
  docs: {
    description: {
      story: 'The `appearance` prop can be set to `inverted`.',
    },
  },
};

export const WithArrow = () => (
  <Tooltip withArrow content="This tooltip has an arrow" relationship="description">
    <Button>With an arrow</Button>
  </Tooltip>
);

WithArrow.parameters = {
  docs: {
    description: {
      story: 'The `withArrow` prop causes the tooltip to render an arrow pointing to its target.',
    },
  },
};

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
