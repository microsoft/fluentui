import { makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
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
  return React.useMemo(
    () => (filter.length ? options.filter(option => option.toLowerCase().includes(filter.toLowerCase())) : []),
    [filter],
  );
};

export const AutocompletePlugin = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const styles = useStyles();
  const filtered = useFilteredList(query);

  React.useEffect(() => {
    setSelectedIndex(0);
    setIsOpen(!!filtered.length);
  }, [filtered]);

  const selectedItem = React.useMemo(() => filtered[selectedIndex], [selectedIndex, filtered]);

  React.useEffect(() => {}, [selectedItem]);

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
      id={id}
      isOpen={isOpen}
      query={query}
      onQueryChange={newQuery => setQuery(newQuery)}
      autocompleteItem={isOpen ? selectedItem : undefined}
      onArrowKeyUp={onArrowKeyUp}
      onArrowKeyDown={onArrowKeyDown}
      onEscape={() => {
        if (isOpen) {
          setIsOpen(false);
          return true;
        }
        return false;
      }}
    >
      {({ onClick, getItemId }) => {
        return (
          <div
            className={mergeClasses(styles.root, !isOpen && styles.hidden)}
            id={id}
            role="listbox"
            aria-expanded={isOpen}
          >
            {filtered.map((option, index) => (
              <div
                id={getItemId(id, option)}
                aria-label={option}
                role="option"
                key={option}
                className={mergeClasses(styles.item, index === selectedIndex && styles.selected)}
                onMouseOver={() => {
                  setSelectedIndex(index);
                }}
                onClick={onClick}
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
