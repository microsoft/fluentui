import * as React from 'react';

import { DemoPage } from '../DemoPage';

import { MarqueeSelectionPageProps } from '@fluentui/react-examples/lib/react/MarqueeSelection/MarqueeSelection.doc';

export const MarqueeSelectionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/MarqueeSelection.page.json')}
    {...{ ...MarqueeSelectionPageProps, ...props }}
  />
);
