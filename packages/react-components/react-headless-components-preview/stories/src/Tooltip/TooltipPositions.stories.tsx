import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

export const Positions = (): React.ReactNode => (
  <div className="flex gap-4 flex-wrap p-20">
    {(['above', 'below', 'before', 'after'] as const).map(position => (
      <Tooltip
        key={position}
        content={{
          className: 'bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md',
          children: `Position: ${position}`,
        }}
        relationship="description"
        positioning={position}
      >
        <button className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer capitalize">
          {position}
        </button>
      </Tooltip>
    ))}
  </div>
);
