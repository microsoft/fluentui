import * as React from 'react';
import { SpinButton } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => (
  <div className="flex w-full max-w-sm flex-col gap-2">
    <label className="text-sm font-medium text-gray-700" htmlFor="quantity-spinbutton">
      Quantity
    </label>
    <SpinButton
      id="quantity-spinbutton"
      defaultValue={1}
      min={0}
      max={99}
      className="relative inline-flex w-40 items-center overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2"
      input={{
        className:
          'w-full flex-1 bg-transparent py-2 pl-3 pr-9 text-center text-sm font-medium text-gray-900 tabular-nums outline-none placeholder:text-gray-400',
      }}
      decrementButton={{
        className:
          'absolute bottom-0 right-0 flex h-1/2 w-8 items-center justify-center border-l border-t border-gray-300 bg-gray-50/70 text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        children: '-',
      }}
      incrementButton={{
        className:
          'absolute right-0 top-0 flex h-1/2 w-8 items-center justify-center border-b border-l border-gray-300 bg-gray-50/70 text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
        children: '+',
      }}
    />
  </div>
);
