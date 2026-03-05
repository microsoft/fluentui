# Utilities/ARIA live/useTypingAnnounce

`useTypingAnnounce` takes a reference to an element (which should be an `input`, `textarea`, or `contenteditable`) and returns a ref to put on the editable input element and a `typingAnnounce` function with the same paramters as the `announce` function returned by `useAnnounce`.

The purpose of `useTypingAnnounce` is to enable screen reader announcements that need to fire while a user is typing, without the announcement conflicting with screen reader keyboard feedback. `typingAnnounce()` will wait until the user stops typing for at least 0.5s before firing the live region.

It is fine to call `typingAnnounce` multiple times in quick succession with updates based on user typing (e.g. for a character limit), so long as all messages have the same `batchId`; only the last message will be announced when the user stops typing. If no `batchId` or different `batchId`s are provided, then all messages will be announced once the user stops typing. For more on `batchId`, see the [AriaLiveAnnouncer docs](http://localhost:3000/?path=/docs/utilities-aria-live-useannounce--docs).

Like `useAnnounce`, `useTypingAnnounce` relies on the existance of either an ancestor `AriaLiveAnnouncer` or a custom live region implementation + `AnnounceProvider`.

## Examples

### Content Editable

Updates on remaining characters will begin being announced once you are within 10 characters of the max length.

```tsx
import * as React from 'react';
import {
  AriaLiveAnnouncer,
  Field,
  JSXElement,
  makeStyles,
  tokens,
  useId,
  useTypingAnnounce,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  contentEditable: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '4px',
    padding: '0.5em',
  },
});

const charCountMessage = (count: number) => {
  // the threshold for announcing character count updates is 10 characters
  const threshold = 10;

  // the maxLength is 100
  const maxLength = 100;

  if (count >= maxLength) {
    return `You have reached the maximum character limit, ${maxLength}`;
  } else if (maxLength - count === 1) {
    return `You have 1 character remaining`;
  } else if (maxLength - count <= threshold) {
    return `You have ${maxLength - count} characters remaining`;
  } else {
    return undefined;
  }
};

export const ContentEditable = (): JSXElement => {
  const [count, setCount] = React.useState(0);
  const styles = useStyles();

  const announceId = useId('charCount');

  const { typingAnnounce, inputRef } = useTypingAnnounce();

  const onInput = (ev: React.FormEvent<HTMLSpanElement>) => {
    const charCount = (ev.target as HTMLSpanElement).textContent?.length ?? 0;
    setCount(charCount);

    const message = charCountMessage(charCount);
    if (message) {
      // pass typingAnnounce a batchId to ensure new charCount updates override old ones
      typingAnnounce(message, { batchId: announceId });
    }
  };

  return (
    <AriaLiveAnnouncer>
      <Field label="A contenteditable div with a maxlength of 100" hint={`${count}/100`}>
        {fieldProps => (
          <span contentEditable ref={inputRef} onInput={onInput} className={styles.contentEditable} {...fieldProps} />
        )}
      </Field>
    </AriaLiveAnnouncer>
  );
};
```

### Default

```tsx
import * as React from 'react';
import { AriaLiveAnnouncer, Field, Input, useId, useTypingAnnounce } from '@fluentui/react-components';
import type { InputProps, JSXElement } from '@fluentui/react-components';

export const Default = (): JSXElement => {
  const [overLimit, setOverLimit] = React.useState(false);
  const announceId = useId('charLimit');

  const { typingAnnounce, inputRef } = useTypingAnnounce<HTMLInputElement>();

  const onChange: InputProps['onChange'] = (_, data) => {
    setOverLimit(data.value.length > 20);

    if (data.value.length > 20) {
      typingAnnounce('You have reached the maximum character limit', {
        batchId: announceId,
      });
    }
  };

  return (
    <AriaLiveAnnouncer>
      <Field label="A field with a maxlength of 20" validationState={overLimit ? 'error' : undefined}>
        <Input onChange={onChange} ref={inputRef} />
      </Field>
    </AriaLiveAnnouncer>
  );
};
```

### Filtering

Dynamic filtering of a set of items outside of a Combobox pattern should generally include live region updates on the number of results returned.

```tsx
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
```
