import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PickersPageProps } from 'office-ui-fabric-react/lib/components/pickers/Pickers.doc';

export const PickersPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...PickersPageProps, ...props }} />;
