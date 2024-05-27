import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $createNamePillNode } from './NamePillNode';

const getAutocompleteItemId = (autocompleteId: string, value: string) => {
  return `${autocompleteId}_item-${value}`;
};

type AutocompletePluginCoreProps = {
  id: string;
  onQueryChange: (newQuery: string) => void;
  children: (renderProps: {
    appendCandidate: () => void;
    getItemId: typeof getAutocompleteItemId;
  }) => React.ReactElement;
  autocompleteItem?: string;
  onArrowKeyUp?: (event: KeyboardEvent) => boolean;
  onArrowKeyDown?: (event: KeyboardEvent) => boolean;
  onEscape?: (event: KeyboardEvent) => boolean;
  announce?: (message: string, options?: { batchId: string }) => void;
};

export const AutocompletePluginCore: React.FC<AutocompletePluginCoreProps> = ({
  id,
  onQueryChange,
  autocompleteItem,
  children,
  onArrowKeyUp,
  onArrowKeyDown,
  announce,
  onEscape,
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
      if (autocompleteItem) {
        const node = sel.getNodes()[0];
        const newNode = $createNamePillNode(autocompleteItem);
        node.replace(newNode);
        newNode.selectEnd();
        announce?.(`Added ${autocompleteItem}`, { batchId: 'added-pill' });
        return true;
      }
    }
    return false;
  }, [editor, autocompleteItem]);

  React.useEffect(() => {
    return editor.registerCommand(KEY_ENTER_COMMAND, appendSelectedItem, COMMAND_PRIORITY_CRITICAL);
  });
  React.useEffect(() => {
    return editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_CRITICAL);
  });

  // Update the activedescendant on the parent element to the currently selected item
  React.useEffect(() => {
    const editorElement = editor.getRootElement();
    if (editorElement && autocompleteItem) {
      editorElement.setAttribute('aria-activedescendant', getAutocompleteItemId(id, autocompleteItem));
    }
  }, [autocompleteItem]);

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const sel = $getSelection();
        if (!sel) return;

        const nodes = sel.getNodes();
        if ($isRangeSelection(sel) && nodes.length === 1) {
          onQueryChange(nodes[0].getTextContent());
        }

        if ($isNodeSelection(sel)) {
          const htmlElement = editor.getElementByKey(nodes[0].__key);
          htmlElement?.ariaLabel && announce?.(htmlElement?.ariaLabel);
          // when node is selected, clear query so that the autocomplete is not shown
          onQueryChange('');
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
        return onArrowKeyUp?.(payload) ?? false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, onArrowKeyUp]);

  React.useEffect(() => {
    return editor.registerCommand(
      KEY_ARROW_DOWN_COMMAND,
      payload => {
        return onArrowKeyDown?.(payload) ?? false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, onArrowKeyDown]);

  return children({ appendCandidate: appendSelectedItem, getItemId: getAutocompleteItemId });
};
