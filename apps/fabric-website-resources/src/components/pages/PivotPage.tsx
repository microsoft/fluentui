import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PivotPageProps } from 'office-ui-fabric-react/lib/components/Pivot/Pivot.doc';

export const PivotPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...PivotPageProps, ...props }} />;
