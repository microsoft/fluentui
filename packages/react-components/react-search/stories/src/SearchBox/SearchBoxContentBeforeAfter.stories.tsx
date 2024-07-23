import * as React from 'react';
import { Button, ButtonProps, Field, makeStyles, SearchBox, Text, tokens } from '@fluentui/react-components';
import { PersonRegular, MicRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldWrapper: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

const MicButton: React.FC<ButtonProps> = props => {
  return <Button {...props} appearance="transparent" icon={<MicRegular />} size="small" />;
};

export const ContentBeforeAfter = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Field
        className={styles.fieldWrapper}
        label="Search by name"
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
        label="Search by voice"
        hint={
          <>
            A SearchBox with a button in the <code>contentAfter</code> slot.
          </>
        }
      >
        <SearchBox contentAfter={<MicButton aria-label="Search by voice" />} />
      </Field>

      <Field
        className={styles.fieldWrapper}
        label="Search with filter"
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
