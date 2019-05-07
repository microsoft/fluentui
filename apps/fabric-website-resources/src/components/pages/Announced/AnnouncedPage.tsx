import * as React from 'react';
import { AnnouncedPageProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage
      jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Announced.page.json')}
      {...{ ...AnnouncedPageProps, ...props }}
    />
  </div>
);
