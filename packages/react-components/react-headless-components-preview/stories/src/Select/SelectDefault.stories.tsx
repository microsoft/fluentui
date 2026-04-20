import * as React from 'react';
import { Select } from '@fluentui/react-headless-components-preview';
import { ChevronDownRegular } from '@fluentui/react-icons';

export const Default = (): React.ReactNode => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <label className="text-sm font-medium text-gray-700" htmlFor="color-select">
        Color
      </label>
      <Select
        className="relative"
        select={{
          className:
            'appearance-none w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        }}
        id="color-select"
        icon={{ className: 'absolute right-2 top-1/2 -translate-y-1/2', children: <ChevronDownRegular /> }}
      >
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </div>
  );
};
