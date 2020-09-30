import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { DividerPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Divider/Divider.doc';

export const DividerPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...DividerPageProps, ...props }} />;
