import * as React from 'react';
import { LayerHost } from '@fluentui/react/lib/Layer';
import { DemoPage } from '../DemoPage';

import { TooltipPageProps } from '@fluentui/react-examples/lib/react/Tooltip/Tooltip.doc';

export const TooltipPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage jsonDocs={require('../../../dist/api/react/Tooltip.page.json')} {...{ ...TooltipPageProps, ...props }} />
  </LayerHost>
);
