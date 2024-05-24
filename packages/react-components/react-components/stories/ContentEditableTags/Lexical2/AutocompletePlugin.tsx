import { makeStyles, mergeClasses, shorthands, useAnnounce } from '@fluentui/react-components';
import * as React from 'react';
import { people } from '../data';
import { AutocompletePluginCore } from './AutocompletePluginCore';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    ...shorthands.gap('2px'),
    maxWidth: '400px',
  },
  hidden: {
    display: 'none',
  },
  item: {
    cursor: 'pointer',
  },
  selected: {
    fontWeight: 'bold',
  },
});

const options = people;

const useFilteredList = (filter: string) => {
  return options.filter(option => option.toLowerCase().includes(filter.toLowerCase()));
};

export const AutocompletePlugin = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { announce } = useAnnounce();

  const styles = useStyles();
  const filtered = useFilteredList(query);

  React.useEffect(() => {
    setSelectedIndex(0);
    setIsOpen(!!query.length);
  }, [query]);

  const selectedItem = React.useMemo(() => filtered[selectedIndex], [selectedIndex, filtered]);

  // React.useEffect(() => {
  //   if (!isOpen || !query) return;
  //   if (filtered.length) {
  //     announce(`Found ${filtered.length} options`, { batchId: 'found-options' });
  //   } else {
  //     announce(`No options found`, { batchId: 'found-options' });
  //   }
  // }, [filtered.length, isOpen]);

  const onArrowKeyUp = React.useCallback(
    event => {
      if (isOpen) {
        setSelectedIndex(currentIndex => {
          return Math.max(0, currentIndex - 1);
        });
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
      return false;
    },
    [isOpen, selectedIndex],
  );

  React.useEffect(() => {
    if (!isOpen || !query) return;
    if (selectedItem) {
      announce(`${selectedItem} ${selectedIndex + 1} of ${filtered.length}`, {
        batchId: 'selected-option',
        polite: false,
      });
    }
  }, [selectedItem, isOpen, query, selectedIndex, filtered]);

  const onArrowKeyDown = React.useCallback(
    event => {
      if (isOpen) {
        setSelectedIndex(currentIndex => {
          return Math.min(currentIndex + 1, filtered.length - 1);
        });
        event.preventDefault();
        event.stopImmediatePropagation();
        return true;
      }
      return false;
    },
    [isOpen, selectedIndex],
  );

  return (
    <AutocompletePluginCore
      onQueryChange={newQuery => setQuery(newQuery)}
      newPillCandidate={filtered[selectedIndex]}
      onArrowKeyUp={onArrowKeyUp}
      onArrowKeyDown={onArrowKeyDown}
      announce={announce}
      onEscape={() => {
        if (isOpen) {
          setIsOpen(false);
          announce('Autocomplete closed', { batchId: 'autocomplete-closed' });
          return true;
        }
        return false;
      }}
    >
      {({ appendCandidate }) => {
        return (
          <div className={mergeClasses(styles.root, !isOpen && styles.hidden)}>
            {filtered.map((option, index) => (
              <div
                key={option}
                className={mergeClasses(styles.item, index === selectedIndex && styles.selected)}
                onMouseOver={() => {
                  setSelectedIndex(index);
                }}
                onClick={() => appendCandidate()}
              >
                {option}
              </div>
            ))}
          </div>
        );
      }}
    </AutocompletePluginCore>
  );
};
