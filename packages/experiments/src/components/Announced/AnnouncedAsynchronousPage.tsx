import * as React from 'react';
import { DemoPage } from '../../../../../apps/fabric-website-resources/src/components/DemoPage';
import { AnnouncedAsynchronousPageProps } from './Announced.doc';

export const AnnouncedAsynchronousPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...AnnouncedAsynchronousPageProps, ...props }} />
);
