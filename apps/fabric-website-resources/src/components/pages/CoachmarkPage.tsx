import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CoachmarkPageProps } from '@fluentui/react-examples/lib/react/Coachmark/Coachmark.doc';

export const CoachmarkPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Coachmark.page.json')}
    {...{ ...CoachmarkPageProps, ...props }}
  />
);
