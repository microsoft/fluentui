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
  const primaryDescriptionId = useId('secondary-tooltip-summary');
  const shortcutId = useId('secondary-tooltip-shortcut');
  const primaryLabelId = useId('secondary-tooltip-primary-label');
  const secondaryLabelId = useId('secondary-tooltip-secondary-label');
  const primaryDetailId = useId('secondary-tooltip-primary-detail');
  const secondaryDetailId = useId('secondary-tooltip-secondary-detail');
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
      <Tooltip
        content={{ children: <span id={primaryDescriptionId}>Bold</span> }}
        secondaryContent="Ctrl+B"
        relationship="description"
        {...props}
      >
        <Button aria-describedby={primaryDescriptionId}>Format</Button>
      </Tooltip>
      <Tooltip
        content="Bold"
        secondaryContent={{ id: shortcutId, children: 'Ctrl+B' }}
        relationship="description"
        {...props}
      >
        <Button aria-describedby={shortcutId}>Format</Button>
      </Tooltip>
      <Tooltip
        content={{ children: <span id={primaryLabelId}>Bold</span> }}
        secondaryContent="Ctrl+B"
        relationship="label"
        {...props}
      >
        <Button icon={<TextBoldRegular />} aria-labelledby={primaryLabelId} />
      </Tooltip>
      <Tooltip
        content="Bold"
        secondaryContent={{ id: secondaryLabelId, children: 'Ctrl+B' }}
        relationship="label"
        {...props}
      >
        <Button icon={<TextBoldRegular />} aria-labelledby={secondaryLabelId} />
      </Tooltip>
      <Tooltip
        content={{ children: <span id={primaryDetailId}>Bold</span> }}
        secondaryContent="Ctrl+B"
        relationship="label"
        {...props}
      >
        <Button icon={<TextBoldRegular />} aria-label="Toggle formatting" aria-describedby={primaryDetailId} />
      </Tooltip>
      <Tooltip
        content="Bold"
        secondaryContent={{ id: secondaryDetailId, children: 'Ctrl+B' }}
        relationship="label"
        {...props}
      >
        <Button icon={<TextBoldRegular />} aria-label="Toggle formatting" aria-describedby={secondaryDetailId} />
      </Tooltip>
      <Tooltip
        content="Bold"
        secondaryContent={{ children: 'Ctrl+B', 'aria-hidden': true }}
        relationship="label"
        {...props}
      >
        <Button data-testid="secondary-hidden-label" icon={<TextBoldRegular />} />
      </Tooltip>
      <Tooltip
        content={<strong>Bold</strong>}
        secondaryContent={{ children: 'Ctrl+B', 'aria-hidden': true }}
        relationship="description"
        {...props}
      >
        <Button data-testid="secondary-hidden-description">Format</Button>
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
        'to the tooltip remain available while it is closed. Authored labels and descriptions can also reference ' +
        'only the primary content or secondary slot. The final two examples set aria-hidden on secondaryContent: ' +
        'the icon button keeps the name "Bold" and the Format button keeps the description "Bold" while closed or open.',
    },
  },
};
