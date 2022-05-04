import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import type { ButtonProps } from '@fluentui/react-button';
import { Body, Text } from '@fluentui/react-text';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
    '> div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('2px') },
  },
});

const MicButton: React.FC<ButtonProps> = props => {
  return <Button {...props} appearance="transparent" icon={<MicRegular />} size="small" />;
};

const ContentBefore = () => {
  const id = useId('content-before');

  return (
    <>
      <Label htmlFor={id}>Full Name</Label>
      <Input contentBefore={<PersonRegular />} id={id} />
      <Body>
        An input with a decorative icon in the <code>contentBefore</code> slot.
      </Body>
    </>
  );
};

const ContentAfter = () => {
  const id = useId('content-after');

  return (
    <>
      <Label htmlFor={id}>First Name</Label>
      <Input contentAfter={<MicButton aria-label="Enter by voice" />} id={id} />
      <Body>
        An input with a button in the <code>contentAfter</code> slot.
      </Body>
    </>
  );
};

const ContentBeforeAndAfter = () => {
  const id = useId('content-before-and-after');
  const beforeId = useId('before-id');
  const afterId = useId('after-id');

  return (
    <>
      <Label htmlFor={id}>Amount to Pay</Label>
      <Input
        contentBefore={
          <Text size={400} id={beforeId}>
            $
          </Text>
        }
        contentAfter={
          <Text size={400} id={afterId}>
            .00
          </Text>
        }
        aria-labelledby={`${id} ${beforeId} ${afterId}`}
        id={id}
      />
      <Body>
        An input with a presentational value in the <code>contentBefore</code> slot and another presentational value in
        the <code>contentAfter</code> slot.
      </Body>
    </>
  );
};

export const ContentBeforeAfter = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <ContentBefore />
      </div>

      <div>
        <ContentAfter />
      </div>

      <div>
        <ContentBeforeAndAfter />
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
