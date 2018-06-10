import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TooltipPageProps } from 'office-ui-fabric-react/lib/components/Tooltip/Tooltip.doc';

export const TooltipPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage {...{ ...TooltipPageProps, ...props }} />
  </LayerHost>
);
