import * as React from 'react';
import {
  AriaLiveAnnouncer,
  Field,
  Input,
  makeStyles,
  tokens,
  useId,
  useTypingAnnounce,
} from '@fluentui/react-components';
import type { InputProps, JSXElement } from '@fluentui/react-components';

const useStyles = makeStyles({
  results: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    marginTop: tokens.spacingVerticalM,
  },
  resultItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },
});

const resultsMessage = (count: number) => {
  if (count < 1) {
    return `No items found`;
  } else if (count === 1) {
    return `One matching item found`;
  } else {
    return `${count} matching items found`;
  }
};

const sampleItems = [
  'combobox_design_presentation.pptx',
  'Design_Research_2023.pdf',
  'Design_Thinking_Workshop_2025.docx',
  'Branding_Guidelines_2024.pdf',
  'Design_Systems_Overview.pptx',
  'UI_Design_Best_Practices.docx',
  'UX_Research_Methods_2023.pdf',
  'Workshop_Notes_2024.docx',
];

export const Filtering = (): JSXElement => {
  const [results, setResults] = React.useState<string[]>([]);
  const styles = useStyles();

  const announceId = useId('filter');

  const { typingAnnounce, inputRef } = useTypingAnnounce<HTMLInputElement>();

  const onChange: InputProps['onChange'] = (_, data) => {
    const searchString = data.value.trim().toLowerCase();
    const filteredItems = searchString.length
      ? sampleItems.filter(item => item.toLowerCase().includes(searchString))
      : [];

    setResults(filteredItems);

    if (searchString.length) {
      const message = resultsMessage(filteredItems.length);

      // pass typingAnnounce a batchId to ensure new result updates override old ones
      typingAnnounce(message, { batchId: announceId });
    }
  };

  return (
    <AriaLiveAnnouncer>
      <Field label="Search files" hint="Try searching for 'design', 'research', or '2025'">
        <Input onChange={onChange} ref={inputRef} />
      </Field>
      {results.length ? (
        <ul className={styles.results}>
          {results.map(item => (
            <li key={item} className={styles.resultItem}>
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </AriaLiveAnnouncer>
  );
};

Filtering.parameters = {
  docs: {
    description: {
      story: `Dynamic filtering of a set of items outside of a Combobox pattern should generally include live region updates on the number of results returned.`,
    },
  },
};
