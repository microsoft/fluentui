import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ImagePageProps } from 'office-ui-fabric-react/lib/components/Image/Image.doc';

export const ImagePage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...ImagePageProps, ...props }} />;
