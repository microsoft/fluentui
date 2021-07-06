import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerHost } from '@fluentui/react/lib/Layer';
import { ResizeGroupPageProps } from '@fluentui/react-examples/lib/react/ResizeGroup/ResizeGroup.doc';

export const ResizeGroupPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage
      jsonDocs={require('@fluentui/api-docs/lib/pages/react/ResizeGroup.page.json')}
      {...{ ...ResizeGroupPageProps, ...props }}
    />
  </LayerHost>
);
