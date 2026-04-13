import * as React from 'react';
import type { JSXElement } from '@fluentui/react-headless-components-preview';
import { Divider } from '@fluentui/react-headless-components-preview';

export const Default = (): JSXElement => (
  <div className="flex flex-col max-w-48 w-full gap-2 *:my-0">
    <p>Content above the divider</p>
    <Divider className="h-px bg-gray-300" />
    <p>Content below the divider</p>
  </div>
);
