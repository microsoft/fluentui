import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListBasicPageProps } from 'office-ui-fabric-react/lib/packages/react-data-views/components/DetailsList/DetailsList.doc';

export const DetailsListBasicPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...DetailsListBasicPageProps, ...props }} />;
