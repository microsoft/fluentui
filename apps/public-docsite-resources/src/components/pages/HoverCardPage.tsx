import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerHost } from '@fluentui/react/lib/Layer';
import { HoverCardPageProps } from '@fluentui/react-examples/lib/react/HoverCard/HoverCard.doc';

export const HoverCardPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage
      jsonDocs={require('../../../dist/api/react/HoverCard.page.json')}
      {...{ ...HoverCardPageProps, ...props }}
    />
  </LayerHost>
);
