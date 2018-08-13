import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TogglePageProps } from 'office-ui-fabric-react/lib/components/Toggle/Toggle.doc';

export const TogglePage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...TogglePageProps, ...props }} />;
