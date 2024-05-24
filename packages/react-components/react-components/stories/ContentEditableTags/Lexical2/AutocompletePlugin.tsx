import { makeStyles, mergeClasses, shorthands, useAnnounce } from '@fluentui/react-components';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { people } from '../data';
import {
  $getSelection,
  SELECTION_CHANGE_COMMAND,
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  $isNodeSelection,
} from 'lexical';
import * as React from 'react';
import { $createNamePillNode } from './NamePillNode';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
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

export type AutocompletePluginProps = {
  query: string;
};

type AutocompletePluginLexicalHooksProps = {
  onQueryChange: (newQuery: string) => void;
  newPillCandidate?: string;
  onKeyUp: (event: KeyboardEvent) => boolean;
  onKeyDown: (event: KeyboardEvent) => boolean;
  children: (renderProps: { appendCandidate: () => void }) => React.ReactElement;
};

const AutocompletePluginLexicalHooks: React.FC<AutocompletePluginLexicalHooksProps> = ({
  onQueryChange,
  newPillCandidate,
  children,
  onKeyUp,
  onKeyDown,
}) => {
  const [editor] = useLexicalComposerContext();

  const appendSelectedItem = React.useCallback(() => {
    const sel = $getSelection();

    // handle deletion of single selected node
    if ($isNodeSelection(sel) && sel.getNodes().length === 1) {
      const selectedNode = sel.getNodes()[0];
      selectedNode.remove();
      return true;
    }

    // handle adding of new node from selection
    if ($isRangeSelection(sel) && sel.getNodes().length === 1) {
      if (newPillCandidate) {
        const node = sel.getNodes()[0];
        const newNode = $createNamePillNode(newPillCandidate);
        node.replace(newNode);
        newNode.selectEnd();
        return true;
      }
    }
    return false;
  }, [editor, newPillCandidate]);

  React.useEffect(() => {
    return editor.registerCommand(KEY_ENTER_COMMAND, appendSelectedItem, COMMAND_PRIORITY_CRITICAL);
  });

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const sel = $getSelection();
        if ($isRangeSelection(sel) && sel.getNodes().length === 1) {
          const node = sel.getNodes()[0];
          onQueryChange(node.getTextContent());
        }
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  React.useEffect(() => {
    return editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      () => {
        return true;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);

  React.useEffect(() => {
    return editor.registerCommand(
      KEY_ARROW_UP_COMMAND,
      payload => {
        return onKeyUp(payload);
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, onKeyUp]);

  React.useEffect(() => {
    return editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      payload => {
        return onKeyDown(payload);
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, onKeyDown]);

  return children({ appendCandidate: appendSelectedItem });
};

export const AutocompletePlugin = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { announce } = useAnnounce();

  const styles = useStyles();
  const filtered = useFilteredList(query);

  React.useEffect(() => {
    if (query.length) {
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setIsOpen(false);
      setSelectedIndex(0);
    }
  }, [query]);

  React.useEffect(() => {
    if (!isOpen || !query) return;
    if (filtered.length) {
      announce(`Found ${filtered.length} options`, { batchId: 'found-options' });
    } else {
      announce(`No options found`, { batchId: 'found-options' });
    }
  }, [filtered.length, isOpen]);

  React.useEffect(() => {
    if (!open || !query) return;
    const option = filtered[selectedIndex];
    if (option) {
      announce(option, { batchId: 'selected-option' });
    }
  }, [selectedIndex]);

  const onKeyUp = React.useCallback(
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

  const onKeyDown = React.useCallback(
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
    <AutocompletePluginLexicalHooks
      onQueryChange={newQuery => setQuery(newQuery)}
      newPillCandidate={filtered[selectedIndex]}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
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
    </AutocompletePluginLexicalHooks>
  );
};
