import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { DemoPage } from '../DemoPage';

import { TooltipPageProps } from 'office-ui-fabric-react/lib/components/Tooltip/Tooltip.doc';

export const TooltipPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage
      jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Tooltip.page.json')}
      {...{ ...TooltipPageProps, ...props }}
    />
  </LayerHost>
);
