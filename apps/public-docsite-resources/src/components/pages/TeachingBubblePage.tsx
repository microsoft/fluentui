import * as React from 'react';
import { LayerHost } from '@fluentui/react/lib/Layer';
import { DemoPage } from '../DemoPage';
import { TeachingBubblePageProps } from '@fluentui/react-examples/lib/react/TeachingBubble/TeachingBubble.doc';

export const TeachingBubblePage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage
      jsonDocs={require('../../../dist/api/react/TeachingBubble.page.json')}
      {...{ ...TeachingBubblePageProps, ...props }}
    />
  </LayerHost>
);
