import * as React from 'react';
import { AnnouncedPageProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';
import { DemoPage } from '../../DemoPage';

export const AnnouncedPage = (props: { isHeaderVisible: boolean }) => (
  <div>
    <DemoPage
      jsonDocs={require('@uifabric/api-docs/lib/pages/react/Announced.page.json')}
      {...{ ...AnnouncedPageProps, ...props }}
    />
  </div>
);
