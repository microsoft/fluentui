import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

export const Controlled = (): React.ReactNode => {
  const [visible, setVisible] = React.useState(false);
  const toggleTooltip = () => setVisible(v => !v);

  return (
    <div className="flex gap-2 items-center">
      <Tooltip
        content={{
          className: 'bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md',
          children: 'Controlled tooltip',
        }}
        relationship="description"
        visible={visible}
      >
        <button className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer">
          Trigger
        </button>
      </Tooltip>
      <button
        onClick={toggleTooltip}
        className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer"
      >
        {visible ? 'Hide' : 'Show'} Tooltip
      </button>
    </div>
  );
};
