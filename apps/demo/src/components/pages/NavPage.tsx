import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { NavPageProps } from 'office-ui-fabric-react/lib/components/Nav/Nav.doc';

export const NavPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...NavPageProps, ...props }} />;
