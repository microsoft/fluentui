import * as React from 'react';
import { Divider } from '@fluentui/react-headless-components-preview';

export const Default = () => (
  <div className="flex flex-col max-w-48 w-full gap-2 *:my-0">
    <p>Content above the divider</p>
    <Divider className="h-px bg-gray-300" />
    <p>Content below the divider</p>
  </div>
);
