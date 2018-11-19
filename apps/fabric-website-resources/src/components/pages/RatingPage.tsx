import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { RatingPageProps } from 'office-ui-fabric-react/lib/components/Rating/Rating.doc';

export const RatingPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...RatingPageProps, ...props }} />;
