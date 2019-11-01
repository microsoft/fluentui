import * as React from 'react';

import { CardPageProps } from '@uifabric/react-cards/lib/components/Card/Card.doc';
import { DemoPage } from '../DemoPage';

export const CardPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('@uifabric/api-docs/lib/pages/react-cards/Card.page.json')} {...{ ...CardPageProps, ...props }} />
);
