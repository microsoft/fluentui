import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isNodeSelection,
  COMMAND_PRIORITY_EDITOR,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { useEffect } from 'react';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import * as React from 'react';
import { $createHorizontalRuleNode, HorizontalRuleNode } from '../Lexical/HorizontalRuleNode';
import { $createNamePillNode, NamePillNode } from './NamePillNode';
import { AutocompletePlugin } from './AutocompletePlugin';
import { AriaLiveAnnouncer } from '@fluentui/react-aria';

const theme = {};

const DefaultValuePlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const paragraph = $createParagraphNode();
      paragraph.append(
        $createTextNode('Hello '),
        $createHorizontalRuleNode(),
        $createTextNode('OK, '),
        $createNamePillNode('Bill'),
        $createNamePillNode('Sam'),
        $createTextNode(', how are you?'),
      );
      $getRoot().append(paragraph);
    });
  }, []);
  return null;
};

const AccessibilityAnnouncePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [lastAnnouncement, setLastAnnouncement] = React.useState('');

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const sel = $getSelection();
        if ($isNodeSelection(sel)) {
          const node = sel.getNodes()[0];
          const htmlElement = editor.getElementByKey(node.__key);
          setLastAnnouncement(htmlElement?.ariaLabel || '');
        } else {
          setLastAnnouncement('');
        }
        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return <div aria-live="polite">{lastAnnouncement}</div>;
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export function LexicalEditor2() {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HorizontalRuleNode, NamePillNode],
  };

  return (
    <AriaLiveAnnouncer>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable style={{ border: '1px solid grey' }} />}
          placeholder={<div></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />

        <AccessibilityAnnouncePlugin />
        <AutocompletePlugin />
      </LexicalComposer>
    </AriaLiveAnnouncer>
  );
}
