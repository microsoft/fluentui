import * as React from 'react';

import { SeparatorPageProps } from 'office-ui-fabric-react/lib/components/Separator/Separator.doc';
import { DemoPage } from '../DemoPage';

export const SeparatorPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...SeparatorPageProps, ...props }} />;
