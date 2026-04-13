import * as React from 'react';
import type { JSXElement } from '@fluentui/react-headless-components-preview';
import { Divider } from '@fluentui/react-headless-components-preview';

export const Vertical = (): JSXElement => (
  <div className="flex items-center h-4 gap-4">
    <a href="#">Link 1</a>
    <Divider className="w-px h-full bg-gray-300" vertical />
    <a href="#">Link 2</a>
  </div>
);
