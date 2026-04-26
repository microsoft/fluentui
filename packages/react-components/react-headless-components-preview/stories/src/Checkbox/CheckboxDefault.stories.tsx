import * as React from 'react';
import { Checkbox } from '@fluentui/react-headless-components-preview';
import { CheckmarkRegular } from '@fluentui/react-icons';

export const Default = (): React.ReactNode => (
  <Checkbox
    label="Default Checkbox"
    className="flex items-center gap-2 relative"
    indicator={{
      className:
        'border border-black rounded size-5 flex items-center justify-center peer-checked:bg-black transition-colors text-transparent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2',
      children: <CheckmarkRegular className="size-4" />,
    }}
    input={{ className: 'absolute size-5 opacity-0 peer z-1' }}
  />
);
