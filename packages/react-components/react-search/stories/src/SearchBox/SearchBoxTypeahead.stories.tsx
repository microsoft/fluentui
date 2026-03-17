import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, mergeClasses, SearchBox, Spinner, tokens, useId } from '@fluentui/react-components';
import type { SearchBoxChangeEvent } from '@fluentui/react-components';
import type { InputOnChangeData } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    maxWidth: '400px',
  },
  listbox: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    boxSizing: 'border-box',
    listStyleType: 'none',
    margin: 0,
    padding: `${tokens.spacingVerticalXS} 0`,
    position: 'absolute',
    width: '100%',
    zIndex: 1000,
  },
  listboxHidden: {
    display: 'none',
  },
  option: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  optionFocused: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    outline: 'none',
  },
  spinnerWrapper: {
    alignItems: 'center',
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground3,
  },
  noResults: {
    color: tokens.colorNeutralForeground3,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
  },
  visuallyHidden: {
    clip: 'rect(0,0,0,0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
});

type SearchResult = {
  id: string;
  label: string;
};

// Simulated async search function
const fakeSearch = (query: string): Promise<SearchResult[]> => {
  const allResults: SearchResult[] = [
    { id: '1', label: 'Accessibility in Fluent UI' },
    { id: '2', label: 'Button component' },
    { id: '3', label: 'Combobox with filtering' },
    { id: '4', label: 'Dark mode theming' },
    { id: '5', label: 'Fluent UI v9 migration guide' },
    { id: '6', label: 'Form validation patterns' },
    { id: '7', label: 'Grid layout examples' },
    { id: '8', label: 'High contrast support' },
    { id: '9', label: 'Icon library overview' },
    { id: '10', label: 'Jest testing utilities' },
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      const filtered = query ? allResults.filter(r => r.label.toLowerCase().includes(query.toLowerCase())) : [];
      resolve(filtered);
    }, 500);
  });
};

export const Typeahead = (): JSXElement => {
  const styles = useStyles();

  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [selectedLabel, setSelectedLabel] = React.useState('');

  const listboxId = useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const optionRefs = React.useRef<(HTMLLIElement | null)[]>([]);

  // Run search when query changes
  React.useEffect(() => {
    if (!query) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);
    setHasSearched(false);
    setFocusedIndex(-1);

    let cancelled = false;
    fakeSearch(query).then(data => {
      if (!cancelled) {
        setResults(data);
        setIsLoading(false);
        setHasSearched(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [query]);

  // Keep focused option scrolled into view
  React.useEffect(() => {
    if (focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const handleChange = (_: SearchBoxChangeEvent, data: InputOnChangeData) => {
    setQuery(data.value);
    setSelectedLabel('');
    setHasSearched(false);
  };

  const handleSelect = (result: SearchResult) => {
    setSelectedLabel(result.label);
    setQuery(result.label);
    setIsOpen(false);
    setFocusedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[focusedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    // Close if focus leaves both the input and the listbox
    const relatedTarget = e.relatedTarget as Node | null;
    const listboxEl = document.getElementById(listboxId);
    if (!listboxEl?.contains(relatedTarget)) {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const showDropdown = isOpen && (isLoading || hasSearched);
  const activedescendant = focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined;

  return (
    <div className={styles.root}>
      <SearchBox
        ref={inputRef}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={showDropdown}
        aria-activedescendant={activedescendant}
        role="combobox"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        root={{ onBlur: handleBlur }}
      />

      {/* Live region announces result count for screen readers */}
      <div aria-live="polite" aria-atomic="true" className={styles.visuallyHidden}>
        {!isLoading && isOpen && `${results.length} result${results.length !== 1 ? 's' : ''} available`}
      </div>

      <ul
        id={listboxId}
        role="listbox"
        aria-label="Search results"
        className={mergeClasses(styles.listbox, !showDropdown && styles.listboxHidden)}
      >
        {isLoading ? (
          <li className={styles.spinnerWrapper} aria-live="polite">
            <Spinner size="tiny" label="Loading results…" labelPosition="after" />
          </li>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <li
              key={result.id}
              id={`${listboxId}-option-${index}`}
              ref={el => {
                optionRefs.current[index] = el;
              }}
              role="option"
              aria-selected={selectedLabel === result.label}
              className={mergeClasses(styles.option, focusedIndex === index && styles.optionFocused)}
              onMouseDown={e => {
                // Prevent input blur before click registers
                e.preventDefault();
              }}
              onClick={() => handleSelect(result)}
            >
              {result.label}
            </li>
          ))
        ) : (
          <li className={styles.noResults}>No results found</li>
        )}
      </ul>
    </div>
  );
};

Typeahead.parameters = {
  docs: {
    description: {
      story: `
A \`SearchBox\` can be combined with a results dropdown to create a typeahead (autocomplete) pattern.
This example demonstrates:

- **Async search**: results are fetched asynchronously as the user types (simulated with a 500ms delay).
- **Loading state**: a \`Spinner\` is shown inside the dropdown while results are loading.
- **Keyboard navigation**: use \`ArrowDown\`/\`ArrowUp\` to move through results, \`Enter\` to select, and \`Escape\` to close the dropdown.
- **Accessibility**: the input uses \`role="combobox"\`, \`aria-autocomplete="list"\`, \`aria-expanded\`, \`aria-controls\`, and \`aria-activedescendant\` to communicate state to assistive technologies. A live region announces the number of results available.

> **Note**: This pattern is intentionally left as a composable building block rather than a single sealed component,
> allowing you to integrate your own data-fetching solution (e.g. TanStack Query, SWR, or a custom hook) and
> to customise the appearance of each result item.
      `.trim(),
    },
  },
};
