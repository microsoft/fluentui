import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const controlsPagesWindows: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/windows',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage),
      ),
  },
];
