import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { LegendsPageProps } from '@fluentui/react-examples/lib/react-charting/Legends/Legends.doc';

export const LegendsPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Legends.page.json')} {...{ ...LegendsPageProps, ...props }} />
);
