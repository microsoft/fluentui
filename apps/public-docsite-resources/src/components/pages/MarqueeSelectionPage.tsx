import * as React from 'react';

import { DemoPage } from '../DemoPage';

import { MarqueeSelectionPageProps } from '@fluentui/react-examples/lib/react/MarqueeSelection/MarqueeSelection.doc';

export const MarqueeSelectionPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/MarqueeSelection.page.json')}
    {...{ ...MarqueeSelectionPageProps, ...props }}
  />
);
