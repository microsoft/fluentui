import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    '& label': { display: 'block', paddingBottom: '2px' },
    '& label:not(:first-child)': { paddingTop: '20px' },
    // Icons default to 1em; we want them a bit larger
    '& svg': { fontSize: '20px' },
  },
});

export const ContentBeforeAfter = () => {
  const beforeId = useId('input-before');
  const afterId = useId('input-after');
  const bothId = useId('input-both');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={beforeId}>Content before</Label>
      <Input contentBefore={<SearchRegular />} id={beforeId} />

      <Label htmlFor={afterId}>Content after</Label>
      <Input contentAfter={<DismissRegular />} id={afterId} />

      <Label htmlFor={bothId}>Content before and after</Label>
      <Input contentBefore={<SearchRegular />} contentAfter={<DismissRegular />} id={bothId} />
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
