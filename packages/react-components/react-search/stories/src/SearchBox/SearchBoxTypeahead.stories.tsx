import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  AriaLiveAnnouncer,
  makeStyles,
  mergeClasses,
  SearchBox,
  Spinner,
  tokens,
  useId,
  useTypingAnnounce,
} from '@fluentui/react-components';
import type { SearchBoxChangeEvent } from '@fluentui/react-components';
import type { InputOnChangeData } from '@fluentui/react-components';

const DEBOUNCE_MS = 300;

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
});

type SearchResult = {
  id: string;
  label: string;
};

// Simulated async search function
const fetchResults = (query: string): Promise<SearchResult[]> => {
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
      resolve(allResults.filter(r => r.label.toLowerCase().includes(query.toLowerCase())));
    }, 500);
  });
};

export const Typeahead = (): JSXElement => {
  const styles = useStyles();

  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [hideActiveDescendant, setHideActiveDescendant] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const listboxId = useId();
  const announceId = useId('typeahead');
  const { typingAnnounce, inputRef } = useTypingAnnounce<HTMLInputElement>();
  const optionRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const cancelRef = React.useRef<(() => void) | null>(null);

  // Debounced search when query changes
  React.useEffect(() => {
    if (!query) {
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);
    setFocusedIndex(-1);

    const debounceTimer = setTimeout(() => {
      let cancelled = false;
      fetchResults(query).then(data => {
        if (!cancelled) {
          setResults(data);
          optionRefs.current = new Array(data.length).fill(null);
          setIsLoading(false);
        }
      });

      // Store cancel in the ref so the cleanup can access it
      cancelRef.current = () => {
        cancelled = true;
      };
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(debounceTimer);
      cancelRef.current?.();
      cancelRef.current = null;
    };
  }, [query]);

  React.useEffect(() => {
    if (!isOpen || isLoading) {
      return;
    }

    if (results.length > 0) {
      typingAnnounce(`${results.length} result${results.length !== 1 ? 's' : ''} available`, {
        batchId: announceId,
      });
    } else if (query.length > 0) {
      typingAnnounce('No results found', { batchId: announceId });
    }
  }, [isLoading, isOpen, results.length, query.length, typingAnnounce, announceId]);

  // Keep focused option scrolled into view
  React.useEffect(() => {
    if (focusedIndex >= 0) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const handleChange = (_: SearchBoxChangeEvent, data: InputOnChangeData) => {
    setQuery(data.value);
    setSelectedId(null);

    if (!data.value) {
      return;
    }

    // useTypingAnnounce waits until the user pauses typing before announcing,
    // preventing interference with screen reader keyboard echo.
    typingAnnounce('Searching…', { batchId: announceId });
  };

  const handleSelect = (result: SearchResult) => {
    setSelectedId(result.id);
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
      setHideActiveDescendant(false);
      setFocusedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHideActiveDescendant(false);
      setFocusedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setHideActiveDescendant(true);
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[focusedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setFocusedIndex(-1);
      setHideActiveDescendant(false);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    // Close if focus leaves both the input and the listbox
    const relatedTarget = e.relatedTarget as Node | null;
    const listboxEl = document.getElementById(listboxId);
    if (!e.currentTarget.contains(relatedTarget) && !listboxEl?.contains(relatedTarget)) {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const showDropdown = isOpen && (isLoading || results.length > 0);
  const noResults = isOpen && !isLoading && query.length > 0 && results.length === 0;
  const activedescendant =
    focusedIndex >= 0 && !hideActiveDescendant ? `${listboxId}-option-${focusedIndex}` : undefined;

  return (
    <AriaLiveAnnouncer>
      <div className={styles.root}>
        <SearchBox
          ref={inputRef}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={showDropdown || noResults}
          aria-activedescendant={activedescendant}
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          root={{ onBlur: handleBlur }}
        />

        <ul
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className={mergeClasses(styles.listbox, !showDropdown && !noResults && styles.listboxHidden)}
        >
          {isLoading ? (
            <li className={styles.spinnerWrapper}>
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
                aria-selected={selectedId === result.id}
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
    </AriaLiveAnnouncer>
  );
};

Typeahead.parameters = {
  docs: {
    description: {
      story: `
A \`SearchBox\` can be combined with a results dropdown to create a typeahead (autocomplete) pattern.
This example demonstrates:

- **Debounced async search**: results are fetched asynchronously after a ${DEBOUNCE_MS}ms debounce to avoid firing on every keystroke. In-flight requests are cancelled when the query changes.
- **Loading state**: a \`Spinner\` is shown inside the dropdown while results are loading.
- **Keyboard navigation**: use \`ArrowDown\`/\`ArrowUp\` to move through results, \`Enter\` to select, and \`Escape\` to close the dropdown.
- **Accessibility**: the input uses \`role="combobox"\`, \`aria-autocomplete="list"\`, \`aria-expanded\`, \`aria-controls\`, and \`aria-activedescendant\` to communicate state to assistive technologies. The \`useTypingAnnounce\` hook announces loading state, result count, and "no results" to screen readers — waiting until the user pauses typing so announcements don't interfere with keyboard echo.

> **Note**: This pattern is intentionally left as a composable building block rather than a single sealed component,
> allowing you to integrate your own data-fetching solution (e.g. TanStack Query, SWR, or a custom hook) and
> to customise the appearance of each result item.
      `.trim(),
    },
  },
};
