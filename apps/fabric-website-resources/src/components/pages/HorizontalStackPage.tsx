import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { HorizontalStackPageProps } from 'office-ui-fabric-react/lib/components/Stack/HorizontalStack/HorizontalStack.doc';

export const HorizontalStackPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...HorizontalStackPageProps, ...props }} />;
