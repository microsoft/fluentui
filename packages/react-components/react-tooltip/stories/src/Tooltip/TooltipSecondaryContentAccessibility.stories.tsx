import * as React from 'react';
import { Button, makeStyles, tokens, Tooltip, useId } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { TextBoldRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  examples: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  example: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
  },
});

export const SecondaryContentAccessibility = (): JSXElement => {
  const styles = useStyles();
  const id = useId('secondary-tooltip');
  return (
    <div className={styles.examples}>
      {(
        [
          ['label', 'aria-labelledby', 'tooltip'],
          ['label', 'aria-describedby', 'tooltip'],
          ['description', 'aria-describedby', 'primary'],
          ['description', 'aria-describedby', 'secondary'],
          ['label', 'aria-labelledby', 'primary'],
          ['label', 'aria-labelledby', 'secondary'],
          ['label', 'aria-describedby', 'primary'],
          ['label', 'aria-describedby', 'secondary'],
        ] as const
      ).map(([relationship, attribute, target], index) => {
        const contentId = `${id}-${index}`;
        const targetId = target === 'tooltip' ? contentId : `${contentId}-${target}`;
        return (
          <div className={styles.example} key={contentId}>
            <span>{`${relationship} / ${attribute} / ${target}`}</span>
            <Tooltip
              content={{ id: contentId, children: <span id={`${contentId}-primary`}>Bold</span> }}
              secondaryContent={{ id: `${contentId}-secondary`, children: 'Ctrl+B' }}
              relationship={relationship}
            >
              <Button
                data-testid={`${relationship}-${attribute}-${target}`}
                icon={relationship === 'label' ? <TextBoldRegular /> : undefined}
                aria-label={
                  relationship === 'label' && attribute === 'aria-describedby' ? 'Toggle formatting' : undefined
                }
                {...{ [attribute]: targetId }}
              >
                {relationship === 'description' ? 'Format' : null}
              </Button>
            </Tooltip>
          </div>
        );
      })}
      <div className={styles.example}>
        <span>Render-function trigger with its own label</span>
        <Tooltip content="Bold" secondaryContent="Ctrl+B" relationship="label">
          {triggerProps =>
            React.createElement('button', { ...triggerProps, 'aria-label': 'Toggle bold formatting' }, 'Bold')
          }
        </Tooltip>
      </div>
      {(['label', 'description'] as const).map(relationship => (
        <div className={styles.example} key={relationship}>
          <span>{`${relationship} with a hidden shortcut`}</span>
          <Tooltip
            content={{
              children: relationship === 'label' ? 'Bold' : <strong>Bold</strong>,
              'aria-label': 'Bold formatting',
            }}
            secondaryContent={{ children: 'Ctrl+B', 'aria-hidden': true }}
            relationship={relationship}
          >
            <Button
              data-testid={`secondary-hidden-${relationship}`}
              icon={relationship === 'label' ? <TextBoldRegular /> : undefined}
            >
              {relationship === 'description' ? 'Format' : null}
            </Button>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

SecondaryContentAccessibility.parameters = {
  docs: {
    description: {
      story:
        'Authored labels and descriptions can reference the whole tooltip, its primary content, or its secondary slot. ' +
        'The final examples hide a redundant shortcut from the generated label or description.',
    },
  },
};
