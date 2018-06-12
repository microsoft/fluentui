import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { LinkPageProps } from 'office-ui-fabric-react/lib/components/Link/Link.doc';

export const LinkPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...LinkPageProps, ...props }} />;
