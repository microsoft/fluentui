import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isDecoratorNode,
  $isNodeSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
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
  isOpen: boolean;
  onQueryChange: (newQuery: string) => void;
  children: (renderProps: { onClick: () => void; getItemId: typeof getAutocompleteItemId }) => React.ReactElement;
  autocompleteItem?: string;
  onArrowKeyUp?: (event: KeyboardEvent) => boolean;
  onArrowKeyDown?: (event: KeyboardEvent) => boolean;
  onEscape?: (event: KeyboardEvent) => boolean;
  query?: string;
};

export const AutocompletePluginCore: React.FC<AutocompletePluginCoreProps> = ({
  id,
  isOpen,
  onQueryChange,
  autocompleteItem,
  children,
  onArrowKeyUp,
  onArrowKeyDown,
  onEscape,
  query,
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
        return true;
      }
    }
    return false;
  }, [autocompleteItem]);

  const onBackspace = React.useCallback(() => {
    const sel = $getSelection();

    if ($isNodeSelection(sel) && sel.getNodes().length === 1) {
      const selectedNode = sel.getNodes()[0];
      if ($isDecoratorNode(selectedNode)) {
        // Have to move the selection at the end and let the native capslock handle the deletion
        // otherwise 2 of the nodes will be deleted for some reason. This feels like a bug in lexical.
        selectedNode.selectEnd();
      }
    }
    return false;
  }, []);

  const onDelete = React.useCallback(() => {
    const sel = $getSelection();

    if ($isNodeSelection(sel) && sel.getNodes().length === 1) {
      const selectedNode = sel.getNodes()[0];
      if ($isDecoratorNode(selectedNode)) {
        // Have to move the selection at the start and let the native delete handle the deletion
        // otherwise 2 of the nodes will be deleted for some reason. This feels like a bug in lexical.
        selectedNode.selectStart();
      }
    }

    return false;
  }, []);

  React.useEffect(() => {
    return editor.registerCommand(KEY_ENTER_COMMAND, appendSelectedItem, COMMAND_PRIORITY_CRITICAL);
  });

  React.useEffect(() => {
    return editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_CRITICAL);
  });
  React.useEffect(() => {
    return editor.registerCommand(KEY_BACKSPACE_COMMAND, onBackspace, COMMAND_PRIORITY_CRITICAL);
  });
  React.useEffect(() => {
    return editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_CRITICAL);
  });

  // Update the activedescendant on the parent element to the currently selected item
  React.useEffect(() => {
    const editorElement = editor.getRootElement();
    if (editorElement && autocompleteItem) {
      editorElement.setAttribute('aria-activedescendant', getAutocompleteItemId(id, autocompleteItem));
    }
  }, [autocompleteItem, editor, id, query]);

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const sel = $getSelection();
        if (!sel) {
          return;
        }

        const editorElement = editor.getRootElement();

        const nodes = sel.getNodes();
        if ($isRangeSelection(sel) && nodes.length === 1) {
          onQueryChange(nodes[0].getTextContent());
          if (!isOpen) {
            editorElement?.setAttribute('aria-activedescendant', '');
          }
        }

        if ($isNodeSelection(sel)) {
          const htmlElement = editor.getElementByKey(nodes[0].__key);

          if (editorElement && htmlElement) {
            editorElement.setAttribute('aria-activedescendant', htmlElement.id);
          }
          // when node is selected, clear query so that the autocomplete is not shown
          onQueryChange('');
        }
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor, isOpen, autocompleteItem, query, onQueryChange]);

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
      KEY_ARROW_LEFT_COMMAND,
      () => {
        editor.getRootElement()?.setAttribute('aria-activedescendant', '');
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor]);
  React.useEffect(() => {
    return editor.registerCommand(
      KEY_ARROW_RIGHT_COMMAND,
      () => {
        editor.getRootElement()?.setAttribute('aria-activedescendant', '');
        return false;
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

  const onClick = React.useCallback(() => {
    editor.update(appendSelectedItem);
  }, [appendSelectedItem, editor]);

  return children({ onClick, getItemId: getAutocompleteItemId });
};
