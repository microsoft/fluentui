import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { VerticalStackPageProps } from 'office-ui-fabric-react/lib/components/Stack/VerticalStack/VerticalStack.doc';

export const VerticalStackPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...VerticalStackPageProps, ...props }} />;
