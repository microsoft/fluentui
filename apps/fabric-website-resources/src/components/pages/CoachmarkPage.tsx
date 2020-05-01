import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CoachmarkPageProps } from 'office-ui-fabric-react/lib/components/Coachmark/Coachmark.doc';

export const CoachmarkPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Coachmark.page.json')}
    {...{ ...CoachmarkPageProps, ...props }}
  />
);
