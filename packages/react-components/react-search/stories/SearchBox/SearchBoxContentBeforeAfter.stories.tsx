import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles, shorthands, Text, tokens } from '@fluentui/react-components';
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
      <Field
        className={styles.fieldWrapper}
        label="Full name"
        hint={
          <>
            A SearchBox with a custom icon in the <code>contentBefore</code> slot.
          </>
        }
      >
        <SearchBox contentBefore={<PersonRegular />} />
      </Field>

      <Field
        className={styles.fieldWrapper}
        label="First name"
        hint={
          <>
            A SearchBox with a custom icon in the <code>contentAfter</code> slot.
          </>
        }
      >
        <SearchBox contentAfter={<MicRegular aria-label="Enter by voice" />} />
      </Field>

      <Field
        className={styles.fieldWrapper}
        label="Amount to Pay"
        hint={
          <>
            A SearchBox with a presentational value in the <code>contentBefore</code> slot and another presentational
            value in the <code>contentAfter</code> slot.
          </>
        }
      >
        <SearchBox contentBefore={<Text size={400}>Search:</Text>} contentAfter={<Text size={400}>Filter</Text>} />
      </Field>
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
