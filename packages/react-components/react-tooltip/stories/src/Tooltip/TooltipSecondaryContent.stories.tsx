import * as React from 'react';
import { Button, makeStyles, tokens, Tooltip } from '@fluentui/react-components';
import type { JSXElement, TooltipProps } from '@fluentui/react-components';
import { TextBoldRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  examples: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
  },
  constrained: {
    maxWidth: '140px',
  },
});

export const SecondaryContent = (props: Partial<TooltipProps>): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.examples}>
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label" {...props}>
        <Button icon={<TextBoldRegular />} />
      </Tooltip>
      <Tooltip content="Shared" secondaryContent="Everyone in your organization" relationship="description" {...props}>
        <Button>Sharing settings</Button>
      </Tooltip>
    </div>
  );
};

SecondaryContent.parameters = {
  docs: {
    description: {
      story:
        'Use secondaryContent for supporting metadata, including keyboard shortcuts. Both regions contribute to the ' +
        'accessible label or description. An explicit trigger label still takes precedence.',
    },
  },
};

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
