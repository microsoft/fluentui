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
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $createNamePillNode } from './NamePillNode';

type AutocompletePluginCoreProps = {
  onQueryChange: (newQuery: string) => void;
  newPillCandidate?: string;
  onKeyUp: (event: KeyboardEvent) => boolean;
  onKeyDown: (event: KeyboardEvent) => boolean;
  children: (renderProps: { appendCandidate: () => void }) => React.ReactElement;
};

export const AutocompletePluginCore: React.FC<AutocompletePluginCoreProps> = ({
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
