import * as React from 'react';
import { INavPage, LoadingComponent } from '@uifabric/example-app-base/lib/index2';

export const controlsPagesCrossPlatform: INavPage[] = [
  {
    title: 'Controls',
    url: '#/controls/crossplatform',
    isHiddenFromMainNav: true,
    component: () => <LoadingComponent title="Controls" />,
    getComponent: cb =>
      require.ensure([], require =>
        cb(require<any>('../../../pages/Overviews/ControlsPage/ControlsPage').ControlsPage),
      ),
  },
  {
    title: 'Basic Inputs',
    isCategory: true,
    pages: [
      {
        title: 'Button',
        url: '#/controls/crossplatform/button',
        component: () => <LoadingComponent title="Button" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/ButtonPage/ButtonPage').ButtonPage)),
      },
      {
        title: 'Link',
        url: '#/controls/crossplatform/link',
        component: () => <LoadingComponent title="Link" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/LinkPage/LinkPage').LinkPage)),
      },
    ],
  },
  {
    title: 'Items & Lists',
    isCategory: true,
    pages: [
      {
        title: 'Persona',
        url: '#/controls/crossplatform/persona',
        component: () => <LoadingComponent title="Persona" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/PersonaPage/PersonaPage').PersonaPage),
          ),
      },
    ],
  },
  {
    title: 'Utilities',
    isCategory: true,
    pages: [
      {
        title: 'Text',
        url: '#/controls/crossplatform/text',
        component: () => <LoadingComponent title="Text" />,
        getComponent: cb =>
          require.ensure([], require => cb(require<any>('../../../pages/Controls/TextPage/TextPage').TextPage)),
      },
      {
        title: 'Separator',
        url: '#/controls/crossplatform/separator',
        component: () => <LoadingComponent title="Separator" />,
        getComponent: cb =>
          require.ensure([], require =>
            cb(require<any>('../../../pages/Controls/SeparatorPage/SeparatorPage').SeparatorPage),
          ),
      },
    ],
  },
];
