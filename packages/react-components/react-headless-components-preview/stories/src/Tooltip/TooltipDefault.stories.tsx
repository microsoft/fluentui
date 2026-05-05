import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

export const Default = (): React.ReactNode => (
  <Tooltip
    content={{
      className: 'bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md',
      children: 'This is the tooltip label',
    }}
    relationship="description"
  >
    <button className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer">
      Hover or focus me
    </button>
  </Tooltip>
);
