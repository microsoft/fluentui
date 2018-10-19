import * as React from 'react';
import { DemoPage } from '../../../../../apps/fabric-website-resources/src/components/DemoPage';
import { AnnouncedPageProps } from '@uifabric/experiments/lib/components/Announced/Announced.doc';

export const AnnouncedPage = (props: { isHeaderVisible: boolean }) => <DemoPage {...{ ...AnnouncedPageProps, ...props }} />;
