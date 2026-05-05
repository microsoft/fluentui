import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

const tooltipContent = (text: string) => ({
  className: 'bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md',
  children: text,
});

export const RelationshipLabel = (): React.ReactNode => (
  <div className="flex gap-2">
    <Tooltip content={tooltipContent('Bold')} relationship="label">
      <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50 font-bold text-sm cursor-pointer">
        B
      </button>
    </Tooltip>
    <Tooltip content={tooltipContent('Italic')} relationship="label">
      <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50 italic text-sm cursor-pointer">
        I
      </button>
    </Tooltip>
    <Tooltip content={tooltipContent('Underline')} relationship="label">
      <button className="w-8 h-8 rounded border border-gray-300 bg-white hover:bg-gray-50 underline text-sm cursor-pointer">
        U
      </button>
    </Tooltip>
  </div>
);

RelationshipLabel.storyName = 'Relationship: label';
RelationshipLabel.parameters = {
  docs: {
    description: {
      story: `A tooltip can serve as the accessible label for its trigger. Use this for icon-only buttons
        with no visible label text. The tooltip sets \`aria-label\` on the trigger so screen readers
        announce the label even when the tooltip is not visible.`,
    },
  },
};
