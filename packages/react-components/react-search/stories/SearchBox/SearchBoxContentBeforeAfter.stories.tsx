import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, shorthands, useId, Body1, Button, Label, Text } from '@fluentui/react-components';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';
import type { ButtonProps } from '@fluentui/react-components';

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
        <SearchBox contentBefore={<PersonRegular />} id={beforeId} />
        <Body1>
          A SearchBox with a custom icon in the <code>contentBefore</code> slot.
        </Body1>
      </div>

      <div>
        <Label htmlFor={afterId}>First name</Label>
        <SearchBox contentAfter={<MicRegular aria-label="Enter by voice" />} id={afterId} />
        <Body1>
          A SearchBox with a custom icon in the <code>contentAfter</code> slot.
        </Body1>
      </div>

      <div>
        <Label htmlFor={beforeAndAfterId}>Amount to pay</Label>
        <SearchBox
          contentBefore={
            <Text size={400} id={beforeLabelId}>
              Search:
            </Text>
          }
          contentAfter={
            <Text size={400} id={afterLabelId}>
              Filter
            </Text>
          }
          aria-labelledby={`${beforeAndAfterId} ${beforeLabelId} ${afterLabelId}`}
          id={beforeAndAfterId}
        />
        <Body1>
          A SearchBox with a presentational value in the <code>contentBefore</code> slot and another presentational
          value in the <code>contentAfter</code> slot.
        </Body1>
      </div>
    </div>
  );
};

ContentBeforeAfter.parameters = {
  docs: {
    description: {
      story:
        'A SearchBox supports a custom element such as an icon or a button before the input text. ' +
        'Additionally, a SearchBox supports an custom element that appears on focus, following the input text and before the dismiss button. ' +
        'These elements are displayed inside the SearchBox border.',
    },
  },
};
ContentBeforeAfter.storyName = 'Content before/after';
