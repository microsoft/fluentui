import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
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

export const ContentBeforeAfter = () => {
  const beforeId = useId('input-before');
  const afterId = useId('input-after');
  const bothId = useId('input-both');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Label htmlFor={beforeId}>Content before</Label>
        <Input contentBefore={<SearchRegular />} id={beforeId} />
      </div>

      <div>
        <Label htmlFor={afterId}>Content after</Label>
        <Input contentAfter={<DismissRegular />} id={afterId} />
      </div>

      <div>
        <Label htmlFor={bothId}>Content before and after</Label>
        <Input contentBefore={<SearchRegular />} contentAfter={<DismissRegular />} id={bothId} />
      </div>
    </div>
  );
};

ContentBeforeAfter.parameters = {
  docs: {
    description: {
      story:
        'An input can have visual content (such as an icon) before or after the entered text, ' +
        'within the input border.',
    },
  },
};
ContentBeforeAfter.storyName = 'Content before/after';
