import * as React from 'react';
import { Input, Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

const documents = ['Budget.xlsx', 'Meeting notes.docx', 'Project plan.docx'];

export const WithInput = (): JSXElement => {
  const [query, setQuery] = React.useState('');
  const [descending, setDescending] = React.useState(false);
  const filteredDocuments = documents
    .filter(name => name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (descending ? b.localeCompare(a) : a.localeCompare(b)));

  return (
    <>
      <Toolbar aria-label="Document actions">
        <ToolbarButton onClick={() => setDescending(false)}>Sort ascending</ToolbarButton>
        <ToolbarButton onClick={() => setDescending(true)}>Sort descending</ToolbarButton>
        <ToolbarDivider />
        <Input
          aria-label="Filter documents"
          placeholder="Filter documents"
          value={query}
          onChange={(_, data) => setQuery(data.value)}
        />
      </Toolbar>
      <ul aria-label="Documents">
        {filteredDocuments.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      {filteredDocuments.length === 0 && <p>No matching documents.</p>}
    </>
  );
};

WithInput.parameters = {
  docs: {
    description: {
      story: [
        'Avoid controls that need the same arrow keys as toolbar navigation. When a textbox is necessary,',
        'place a single Input last in a horizontal Toolbar, as recommended by the',
        '[WAI-ARIA toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/).',
        'This example uses a controlled Input to filter the document list.',
        '',
        'Use Tab or Shift+Tab to enter or leave the toolbar and Left/Right Arrow to move between its buttons.',
        'Inside the Input, typing edits the value and Shift+Left/Right Arrow selects text.',
        'Caret movement depends on text direction and native browser editing behavior.',
        'Editing keys, including Home/End, follow the browser and platform text-editing conventions.',
        'In a left-to-right layout, with no selection, Left Arrow at the beginning or Right Arrow at the end moves focus out of the Input',
        'to another toolbar control. Tab and Shift+Tab leave the toolbar without visiting every control;',
        're-entering restores focus to the last focused control.',
      ].join('\n'),
    },
  },
};
