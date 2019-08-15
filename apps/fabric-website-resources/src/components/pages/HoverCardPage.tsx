import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { HoverCardPageProps } from 'office-ui-fabric-react/lib/components/HoverCard/HoverCard.doc';

export const HoverCardPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage
      jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/HoverCard.page.json')}
      {...{ ...HoverCardPageProps, ...props }}
    />
  </LayerHost>
);
