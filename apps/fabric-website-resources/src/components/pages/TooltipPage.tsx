import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { DemoPage } from '../DemoPage';

import { TooltipPageProps } from 'office-ui-fabric-react/lib/components/Tooltip/Tooltip.doc';

export const TooltipPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage {...{ ...TooltipPageProps, ...props }} />
  </LayerHost>
);
