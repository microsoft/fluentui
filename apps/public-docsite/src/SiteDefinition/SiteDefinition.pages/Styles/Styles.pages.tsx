import * as React from 'react';
import { INavPage, LoadingComponent } from '@fluentui/react-docsite-components/lib/index2';
import { stylesPagesWeb } from './index';

export const StylesPages: INavPage = {
  title: 'Styles',
  url: '#/styles',
  className: 'stylesPage',
  isUhfLink: true,
  hasPlatformPicker: true,
  isSearchable: true,
  component: () => <LoadingComponent title="Styles" />,
  getComponent: cb =>
    require.ensure([], require => cb(require<any>('../../../pages/Overviews/StylesPage/StylesPage').StylesPage)),
  platforms: {
    web: stylesPagesWeb,
  },
};
