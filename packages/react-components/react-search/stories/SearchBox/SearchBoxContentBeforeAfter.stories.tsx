import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles, shorthands, Body1, Text, tokens } from '@fluentui/react-components';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
  fieldWrapper: {
    ...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalMNudge),
  },
});

export const ContentBeforeAfter = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.fieldWrapper}>
        <Field label="Full name">
          <SearchBox contentBefore={<PersonRegular />} />
          <Body1>
            A SearchBox with a custom icon in the <code>contentBefore</code> slot.
          </Body1>
        </Field>
      </div>

      <div className={styles.fieldWrapper}>
        <Field label="First name">
          <SearchBox contentAfter={<MicRegular aria-label="Enter by voice" />} />
          <Body1>
            A SearchBox with a custom icon in the <code>contentAfter</code> slot.
          </Body1>
        </Field>
      </div>

      <div className={styles.fieldWrapper}>
        <Field label="Amount to Pay">
          <SearchBox contentBefore={<Text size={400}>Search:</Text>} contentAfter={<Text size={400}>Filter</Text>} />
          <Body1>
            A SearchBox with a presentational value in the <code>contentBefore</code> slot and another presentational
            value in the <code>contentAfter</code> slot.
          </Body1>
        </Field>
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
