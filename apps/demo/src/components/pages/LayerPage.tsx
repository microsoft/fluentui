import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { LayerPageProps } from 'office-ui-fabric-react/lib/components/Layer/Layer.doc';

export const LayerPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...LayerPageProps, ...props }} />;
