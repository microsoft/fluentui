import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

export const RelationshipDescription = (): React.ReactNode => (
  <Tooltip
    content={{
      className: 'bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md',
      children: 'This is the description of the button',
    }}
    relationship="description"
  >
    <button className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer">
      Button
    </button>
  </Tooltip>
);

RelationshipDescription.storyName = 'Relationship: description';
RelationshipDescription.parameters = {
  docs: {
    description: {
      story: `A tooltip can provide supplementary description for its trigger via \`aria-describedby\`.
        Use this when the trigger already has a visible label but needs additional descriptive context
        for screen readers.`,
    },
  },
};
