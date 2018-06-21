import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { ResizeGroupPageProps } from 'office-ui-fabric-react/lib/components/ResizeGroup/ResizeGroup.doc';

export const ResizeGroupPage = (props: { isHeaderVisible: boolean }) => (
  <LayerHost>
    <DemoPage {...{ ...ResizeGroupPageProps, ...props }} />
  </LayerHost>
);
