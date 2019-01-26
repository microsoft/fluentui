import * as React from 'react';

import { PropertiesTableSet } from '@uifabric/example-app-base';

export const IThemePage = (props: { isHeaderVisible: boolean }) => (
  <PropertiesTableSet jsonDocs={require('../../../../../common/pages/ITheme.page.json')} />
);
