import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Tooltip } from '@fluentui/react-modern-components-preview/tooltip';
import { ArrowRoutingRegular } from '@fluentui/react-icons';

export const Target = (): React.ReactNode => {
  const [iconRef, setIconRef] = React.useState<HTMLSpanElement | null>(null);
  return (
    <Tooltip
      positioning={{ target: iconRef }}
      withArrow
      content="This tooltip points to the icon"
      relationship="description"
    >
      <Button icon={{ ref: setIconRef, children: <ArrowRoutingRegular /> }}>Button with icon</Button>
    </Tooltip>
  );
};

Target.parameters = {
  docs: {
    description: {
      story: `The tooltip can be placed relative to a custom element using \`positioning.target\`. In this example, the
        tooltip points to the icon inside the button, but it could point to any element.`,
    },
  },
};
