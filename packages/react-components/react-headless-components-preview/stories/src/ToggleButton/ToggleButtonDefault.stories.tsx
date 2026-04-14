import * as React from 'react';
import { ToggleButton } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => {
  const [checked, setChecked] = React.useState(false);
  return (
    <ToggleButton
      className="flex items-center justify-center size-9 px-0 border border-gray-300 rounded-md bg-white font-inherit text-sm font-bold text-gray-700 select-none cursor-pointer hover:bg-gray-50 hover:data-[disabled]:bg-white data-[checked]:bg-gray-900 data-[checked]:text-white data-[checked]:border-gray-900 data-[checked]:hover:bg-gray-800 data-[checked]:hover:data-[disabled]:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed"
      checked={checked}
      onClick={() => setChecked(v => !v)}
      aria-label="Toggle value"
    >
      {checked ? 'On' : 'Off'}
    </ToggleButton>
  );
};
