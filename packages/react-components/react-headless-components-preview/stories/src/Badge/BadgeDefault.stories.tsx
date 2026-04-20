import * as React from 'react';
import { Badge } from '@fluentui/react-headless-components-preview';

export const Default = (): React.ReactNode => (
  <div className="flex items-center gap-3 flex-wrap">
    <Badge className="inline-flex items-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
      New
    </Badge>
    <Badge className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
      Success
    </Badge>
    <Badge className="inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-medium text-white">
      Warning
    </Badge>
    <Badge className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-medium text-white">
      Error
    </Badge>
    <Badge className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
      9
    </Badge>
  </div>
);
