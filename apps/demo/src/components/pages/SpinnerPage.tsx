import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SpinnerPageProps } from 'office-ui-fabric-react/lib/components/Spinner/Spinner.doc';

export const SpinnerPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...SpinnerPageProps, ...props }} />;
