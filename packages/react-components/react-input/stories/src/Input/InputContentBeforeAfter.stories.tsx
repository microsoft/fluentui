import * as React from 'react';
import { makeStyles, useId, Body1, Button, Input, Label, Text } from '@fluentui/react-components';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';
import type { ButtonProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
    '> div': { display: 'flex', flexDirection: 'column', gap: '2px' },
  },
});

const MicButton: React.FC<ButtonProps> = props => {
  return <Button {...props} appearance="transparent" icon={<MicRegular />} size="small" />;
};

export const ContentBeforeAfter = () => {
  const styles = useStyles();

  const beforeId = useId('content-before');
  const afterId = useId('content-after');
  const beforeAndAfterId = useId('content-before-and-after');
  const beforeLabelId = useId('before-label');
  const afterLabelId = useId('after-label');

  return (
    <div className={styles.root}>
      <div>
        <Label htmlFor={beforeId}>Full name</Label>
        <Input contentBefore={<PersonRegular />} id={beforeId} />
        <Body1>
          An input with a decorative icon in the <code>contentBefore</code> slot.
        </Body1>
      </div>

      <div>
        <Label htmlFor={afterId}>First name</Label>
        <Input contentAfter={<MicButton aria-label="Enter by voice" />} id={afterId} />
        <Body1>
          An input with a button in the <code>contentAfter</code> slot.
        </Body1>
      </div>

      <div>
        <Label htmlFor={beforeAndAfterId}>Amount to pay</Label>
        <Input
          contentBefore={
            <Text size={400} id={beforeLabelId}>
              $
            </Text>
          }
          contentAfter={
            <Text size={400} id={afterLabelId}>
              .00
            </Text>
          }
          aria-labelledby={`${beforeAndAfterId} ${beforeLabelId} ${afterLabelId}`}
          id={beforeAndAfterId}
        />
        <Body1>
          An input with a presentational value in the <code>contentBefore</code> slot and another presentational value
          in the <code>contentAfter</code> slot.
        </Body1>
      </div>
    </div>
  );
};

ContentBeforeAfter.parameters = {
  docs: {
    description: {
      story:
        'An input can have elements such as an icon or a button before or after the entered text. ' +
        'These elements are displayed inside the input border.',
    },
  },
};
ContentBeforeAfter.storyName = 'Content before/after';
