import * as React from 'react';
import { Button, makeStyles, Tooltip } from '@fluentui/react-components';
import type { JSXElement, TooltipProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  constrained: {
    maxWidth: '140px',
  },
});

export const SecondaryContentWrapping = (props: Partial<TooltipProps>): JSXElement => {
  const styles = useStyles();
  return (
    <Tooltip
      visible
      withArrow
      content={{ children: 'Shared', className: styles.constrained }}
      secondaryContent="Available to everyone in this organization"
      relationship="description"
      {...props}
    >
      <Button>Sharing settings</Button>
    </Tooltip>
  );
};

SecondaryContentWrapping.args = {
  appearance: 'normal',
  secondaryContent: 'Available to everyone in this organization',
};

SecondaryContentWrapping.parameters = {
  docs: {
    description: {
      story:
        'Secondary content aligns to the logical end. Under a width constraint it moves below the primary content ' +
        'and wraps within the tooltip instead of overflowing.',
    },
  },
};
