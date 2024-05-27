import { AriaLiveAnnouncer } from '@fluentui/react-aria';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import * as React from 'react';
import { AutocompletePlugin } from './AutocompletePlugin';
import { NamePillNode } from './NamePillNode';

import { getId } from '@fluentui/react';

const theme = {};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export function LexicalEditor2() {
  const id = getId('autocomplete');

  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [NamePillNode],
  };

  return (
    <AriaLiveAnnouncer>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable style={{ border: '1px solid grey' }} ariaOwns={id} />}
          placeholder={<div></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <AutocompletePlugin id={id} />
      </LexicalComposer>
    </AriaLiveAnnouncer>
  );
}
