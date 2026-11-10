import * as React from 'react';
import { Button, makeStyles, tokens, Tooltip, useId } from '@fluentui/react-components';
import type { JSXElement, TooltipProps } from '@fluentui/react-components';
import { TextBoldRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  examples: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
  },
});

export const SecondaryContent = (props: Partial<TooltipProps>): JSXElement => {
  const styles = useStyles();
  const labelId = useId('secondary-tooltip-label');
  const descriptionId = useId('secondary-tooltip-description');
  return (
    <div className={styles.examples}>
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label" {...props}>
        <Button icon={<TextBoldRegular />} />
      </Tooltip>
      <Tooltip content="Shared" secondaryContent="Everyone in your organization" relationship="description" {...props}>
        <Button>Sharing settings</Button>
      </Tooltip>
      <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label" {...props}>
        {triggerProps =>
          React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' }, 'Bold')
        }
      </Tooltip>
      <Tooltip
        content={{ id: labelId, children: <strong>Bold</strong> }}
        secondaryContent="Ctrl+B"
        relationship="label"
        {...props}
      >
        <Button icon={<TextBoldRegular />} aria-labelledby={labelId} />
      </Tooltip>
      <Tooltip
        content={{ id: descriptionId, children: <strong>Bold</strong> }}
        secondaryContent="Ctrl+B"
        relationship="label"
        {...props}
      >
        <Button icon={<TextBoldRegular />} aria-label="Toggle formatting" aria-describedby={descriptionId} />
      </Tooltip>
    </div>
  );
};

SecondaryContent.parameters = {
  docs: {
    description: {
      story:
        'Use secondaryContent for supporting metadata, including keyboard shortcuts. Both regions contribute to the ' +
        'accessible label or description. An explicit trigger label still takes precedence. Authored ID references ' +
        'to the tooltip remain available while it is closed.',
    },
  },
};
